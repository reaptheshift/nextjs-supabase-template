import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { boundaries },
    settings: {
      // Silence v6→v7 migration noise until patterns are rewritten for the entity model
      "boundaries/legacy-warnings": false,
      "boundaries/include": ["**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/server/**/*",
            "src/utils/**/*",
            "src/types/**/*",
            "src/styles/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: [
            "/*",
            "supabase/**/*",
            "proxy.ts",
            "*.config.mjs",
            "*.config.ts",
            "tsconfig.json",
          ],
        },
      ],
    },
    rules: {
      "boundaries/no-unknown": ["error"],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: ["shared"], allow: ["shared"] },
            {
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { featureName: "${from.featureName}" }],
              ],
            },
            { from: ["app", "neverImport"], allow: ["shared", "feature"] },
            { from: ["app"], allow: [["app", { fileName: "*.css" }]] },
          ],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "eslint.config.mjs",
  ]),
]);

export default eslintConfig;
