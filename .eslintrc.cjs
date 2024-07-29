module.exports = {
  root: true,
  env: {
    es2020: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  rules: {
    // 공통 규칙을 여기에 추가하세요
  },
};
