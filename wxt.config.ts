import { defineConfig } from "wxt";
import packageJson from "./package.json";

export default defineConfig({
	manifest: {
		name: "Google Meet - Global Shortcuts",
		description:
			"Provides shortcuts for turning on/off microphone/camera in Google Meet meetings even when you're in other tabs",
		version: packageJson.version,
		permissions: ["notifications", "tabs"],
		commands: {
			"toggle-audio": {
				suggested_key: {
					default: "Ctrl+Shift+D",
					mac: "Alt+Shift+D",
				},
				description: "Toggle Microphone",
			},
			"toggle-camera": {
				suggested_key: {
					default: "Ctrl+Shift+E",
					mac: "Alt+Shift+E",
				},
				description: "Toggle Camera",
			},
			"toggle-hand": {
				suggested_key: {
					default: "Ctrl+Shift+H",
					mac: "Alt+Shift+H",
				},
				description: "Toggle Raised Hand",
			},
			"activate-meet-tab": {
				description: "Open Meet tab",
			},
		},
	},
	outDirTemplate: "{{browser}}-mv{{manifestVersion}}",
});
