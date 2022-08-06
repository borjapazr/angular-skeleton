/*
 * simple-import-sort default grouping, but with type imports last as a separate
 * group, sorting that group like non-type imports are grouped.
 */
const importGroups = [
  // Side effect imports.
  ['^\\u0000'],
  // Packages.
  // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
  ['^@?\\w'],
  // Absolute imports and other imports such as Vue-style `@/foo`.
  // Anything not matched in another group.
  ['^'],
  // Relative imports.
  // Anything that starts with a dot
  ['^\\.'],
  // Typings
  ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$']
];

/*
 * Configuration for simple-import-sort plugin to detect
 * the different namespaces defined in the application.
 * This matches the "paths" property of the tsconfig.json file.
 */
const { compilerOptions } = require('get-tsconfig').getTsconfig('./tsconfig.json')['config'];
if ('paths' in compilerOptions) {
  const namespaces = Object.keys(compilerOptions.paths).map(path => path.replace('/*', ''));
  if (namespaces && namespaces.length > 0) {
    // Anything that is defined in tsconfig.json with a little trick in order to resolve paths
    const pathAliasRegex = [`^(${namespaces.join('|')})(/.*|$)`];
    importGroups.splice(2, 0, pathAliasRegex);
  }
}

/*
 * Although many of the extended configurations already automatically
 * import the plugins, we have chosen to add them explicitly in case
 * the recommended configurations are dispensed with in the future.
 * In this way the rules could be added directly in the "rules" section.
 */
module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  env: {
    node: true,
    jest: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  overrides: [
    {
      files: '*.js',
      extends: ['eslint:recommended']
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.server.json', './tsconfig.spec.json'],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/recommended--extra',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:eslint-comments/recommended',
        'plugin:sonarjs/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended'
      ],
      plugins: [
        '@typescript-eslint',
        'prefer-arrow',
        'eslint-comments',
        'sonarjs',
        'import',
        'prettier',
        'simple-import-sort',
        'unused-imports',
        'deprecation'
      ],
      settings: {
        // Define import resolver for import plugin
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true
          }
        }
      },
      rules: {
        // For faster development
        'no-process-exit': 'off',
        'no-useless-constructor': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'sonarjs/cognitive-complexity': ['error', 18],

        // Angular specific
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case'
          }
        ],

        // Import and order style
        'simple-import-sort/imports': [
          'error',
          {
            groups: importGroups
          }
        ],
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['../*', './../*'],
                message: 'For imports of parent elements use better path aliases. For example, @domain/shared.'
              }
            ]
          }
        ],
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'simple-import-sort/exports': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-deprecated': 'error',
        'import/group-exports': 'error',
        'import/exports-last': 'error',
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'export' },
          { blankLine: 'any', prev: 'export', next: 'export' }
        ],
        quotes: [
          'error',
          'single',
          {
            allowTemplateLiterals: true
          }
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
        ],

        // General rules
        'deprecation/deprecation': 'warn',
        'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': 'error',
        'prefer-arrow/prefer-arrow-functions': [
          'warn',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: false
          }
        ]
      },
      overrides: [
        {
          files: ['*.unit.ts', '*.int.ts', '*.spec.ts', '*.test.ts'],
          env: {
            jest: true,
            'jest/globals': true
          },
          extends: ['plugin:jest/recommended', 'plugin:jest/style'],
          plugins: ['jest'],
          rules: {
            'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'request.**.expect'] }]
          }
        },
        {
          files: ['*.e2e.ts', '*.cy.ts'],
          env: {
            'cypress/globals': true
          },
          parserOptions: {
            project: './cypress/tsconfig.json'
          },
          extends: ['plugin:cypress/recommended'],
          plugins: ['cypress'],
          rules: {}
        }
      ]
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {}
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': ['error', { parser: 'angular' }]
      }
    }
  ]
};
