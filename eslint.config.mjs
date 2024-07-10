import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    plugins: ["ejs"],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
];
