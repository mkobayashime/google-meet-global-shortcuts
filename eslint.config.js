import { typescriptWithBiome } from "@mkobayashime/shared-config/eslint";
import { globalIgnores } from "eslint/config";

export default [
	...typescriptWithBiome,
	{
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	},
	globalIgnores([".wxt"]),
];
