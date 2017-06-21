module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "plugin:jest/recommended"],
    "plugins": [
        "jest"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            {"SwitchCase": 1}
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ]
    }
};