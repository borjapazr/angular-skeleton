module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-sass-guidelines',
    'stylelint-config-prettier-scss',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-scss', 'stylelint-no-unsupported-browser-features', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'selector-no-qualifying-type': null,
    'max-nesting-depth': null,
    'at-rule-empty-line-before': null,
    'no-descending-specificity': null,
    'declaration-block-trailing-semicolon': null,
    'selector-max-compound-selectors': 5,
    'no-empty-source': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning'
      }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
      }
    ],
    'import-notation': null
  }
};
