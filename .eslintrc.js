module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb-typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint-config-prettier",
    ],
    "overrides": [
      {
        "env": {
          "node": true
        },
        "files": [
          ".eslintrc.{js,cjs}"
        ],
        "parserOptions": {
          "sourceType": "script",
          "project": null,
        },
        "rules": {
          "@typescript-eslint/*": "off",
        },
      }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "ecmaFeatures": {
            "jsx": true,
        },
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "jsx-a11y",
    ],
    "rules": {
        "semi": ["error", "always"],
        "semi-spacing": ["error", {"after": true, "before": false}],
        "semi-style": ["error", "last"],
        "no-extra-semi": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "@typescript-eslint/semi": "off",
        "no-unexpected-multiline": "error",
        "import/extensions": ["error", "never"],
        "comma-dangle": ["error", "always-multiline"],
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    }
}
