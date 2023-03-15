module.exports = {
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
				'plugin:@next/next/recommended',
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "jsx-a11y",
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
				"require-await": "error",
    }
}
