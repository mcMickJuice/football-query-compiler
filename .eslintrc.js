module.exports = {
    "env": {
        "es6": true,
        "node": true,
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
            {"SwitchCase": 2}
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