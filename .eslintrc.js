module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ['plugin:@typescript-eslint/recommended', "plugin:prettier/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module",
        ecmaFeatures:  {
            jsx:  true,
        },
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        'prettier'
    ],
    "rules": {
        "react/jsx-max-props-per-line": [2, {"maximum": 1, "when": "always" }],
        "react/jsx-first-prop-new-line": [2, "never"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "prettier/prettier": "error",
        "@typescript-eslint/no-var-requires": "off"
    }
};
