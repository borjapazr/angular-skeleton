module.exports = {
  '*.{js,ts}': [
    'prettier --check --write --ignore-unknown',
    'eslint --cache --color --fix',
    () => 'tsc --pretty --noEmit'
  ],
  '!*.{js,ts}': ['prettier --check --write --ignore-unknown'],
  '*.html': ['htmlhint'],
  '*.scss': ['stylelint --cache --color --fix'],
  'src/assets/i18n/**/*.json': ['transloco-validator'],
  '{README.md,TODO.md,.github/*.md,src/**/*.ts}': ['cspell']
};
