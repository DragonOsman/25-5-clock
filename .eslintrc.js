/* eslint-disable no-undef */
module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "parser": "babel",
    "sourceType": "script"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "yoda": "error",
    "eqeqeq": "error",
    "prefer-const": "error",
    "no-var": "error",
    "space-before-function-paren": "off"
  }
};