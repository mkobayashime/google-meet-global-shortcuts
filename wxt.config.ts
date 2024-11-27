import { defineConfig } from "wxt";
import packageJson from "./package.json";

export default defineConfig({
  extensionApi: "chrome",
  manifest: {
    name: "Google Meet - Global Shortcuts",
    version: packageJson.version,
    permissions: ["notifications", "tabs"],
    commands: {
      "toggle-audio": {
        suggested_key: {
          default: "Ctrl+Shift+D",
          mac: "Alt+Shift+D",
        },
        description: "Toggle Audio",
      },
      "toggle-camera": {
        suggested_key: {
          default: "Ctrl+Shift+E",
          mac: "Alt+Shift+E",
        },
        description: "Toggle Camera",
      },
    },
  },
});
