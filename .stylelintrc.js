module.exports = {
    "extends": "stylelint-config-standard",
    "processors": "stylelint-processor-html",
    "rules": {
        "selector-pseudo-element-colon-notation": null,
        "number-leading-zero": "never",
        "indentation": [
            2,
            {
                "severity": "warning"
            }
        ]
    }
}