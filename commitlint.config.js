module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['test', 'chore', 'style', 'fix', 'update', 'revert', 'merge', 'add', 'feat']],
    'type-case': [2, 'always', 'kebab-case'],
    'scope-case': [2, 'always', 'kebab-case']
  }
};
