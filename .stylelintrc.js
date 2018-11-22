module.exports = {
    "extends": "stylelint-config-standard",
    "fix": true,
    "rules": {
      "color-no-invalid-hex": true,
      "string-quotes": "single",
      "property-no-unknown": [
        true,
        {
          "ignoreProperties": [
            "composes"
          ]
        }
      ],
      "selector-pseudo-class-no-unknown": [
        true,
        {
          "ignorePseudoClasses": [
            "global"
          ]
        }
      ],
      "indentation": "tab",
      "number-leading-zero": null
    }
  }