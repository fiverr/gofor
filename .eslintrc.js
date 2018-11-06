module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'script',
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  env: {
    node: true
  },
  extends: [
    '@fiverr/eslint-config-fiverr/rules/base',
    '@fiverr/eslint-config-fiverr/rules/es6'
  ],
  plugins: [],
  overrides: [
    {
      files: [ 'test.js', '**/test.js', '**/tests/**/*' ],
      env: {
        mocha: true
      },
      globals: {
        global: true,
        expect: true,
        assert: true
      },
      rules: {
        'no-console': 0
      }
    }
  ]
}
