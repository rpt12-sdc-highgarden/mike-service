/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: [
    'airbnb',
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-undef': 'off',
    'no-console': 'off'
  },
  env: {
    'commonjs': true,
    'node': true,
    'jest': true
  }
};