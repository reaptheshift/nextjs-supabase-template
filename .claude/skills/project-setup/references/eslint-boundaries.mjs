import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

/** Copy into repo-root `eslint.config.mjs` during /setup-project (merge if Next already wrote one). */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { boundaries },
    settings: {
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
      "boundaries/no-unknown-dependencies": ["error"],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { element: { type: "shared" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              from: { element: { type: "feature" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              // A feature may import itself, never another feature.
              from: { element: { type: "feature" } },
              allow: {
                to: {
                  element: {
                    type: "feature",
                    captured: {
                      featureName: "{{ from.element.captured.featureName }}",
                    },
                  },
                },
              },
            },
            {
              from: { element: { type: ["app", "neverImport"] } },
              allow: { to: { element: { type: ["shared", "feature"] } } },
            },
            {
              from: { element: { type: "app" } },
              allow: {
                to: { element: { type: "app", captured: { fileName: "*.css" } } },
              },
            },
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
