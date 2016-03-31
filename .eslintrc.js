module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-console": "off",
    "indent": [2, "tab", { "SwitchCase": 1 }],
    "quotes": ["error", "single" ],
    "semi": ["error", "always"]
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": [
    "react"
  ]
};
