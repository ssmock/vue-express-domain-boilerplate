module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    "@vue/typescript"
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "vue/singleline-html-element-content-newline": 0,
    "vue/max-attributes-per-line": 0,
    "vue/html-self-closing": 0,
    "vue/require-prop-types": 0,
    "vue/no-v-html": 0
  }
}
