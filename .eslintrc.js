module.exports = {
  "extends": ["eslint-config-umi"],
  "rules": {
    // 强制使用一致的缩进
    "indent": [
      "error",
      "tab"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    // 使用单引号
    "quotes": [
      "error",
      "single"
    ],
    // 禁止使用console.log
    "no-console": [
      "error",
      { "allow": ["warn", "error"] }
    ],
    // 强制使用全等和不全等
    "eqeqeq": [
      "error",
      "always"
    ],
    // 短符号的类型强转
    "no-implicit-coercion": [
      "error",
      { "number": true, "string": true, "boolean": true }
    ],

    // 必须使用分号
    "semi": [
      "error",
      "always"
    ],

    // 禁止使用var声明变量
    "no-var": [
      "error"
    ]
  }
}