import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  manifest: {
    name: "Google Meet - Global Shortcuts",
    version: "0.1.0",
    permissions: ["notifications", "tabs"],
    commands: {
      "toggle-audio": {
        suggested_key: {
          default: "Ctrl+Shift+D",
          mac: "Alt+Shift+D",
        },
        description: "Toggle audio",
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
