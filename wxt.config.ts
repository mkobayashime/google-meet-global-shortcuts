import { defineConfig } from "wxt";
import packageJson from "./package.json";

export default defineConfig({
	manifest: {
		name: "Google Meet - Global Shortcuts",
		description:
			"Control your microphone/camera, raised hand, and reactions in Google Meet meetings even when you're in other tabs",
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
			"reaction-1-sparkling-heart": {
				description: "Reaction 💖",
			},
			"reaction-2-thumbs-up": {
				description: "Reaction 👍",
			},
			"reaction-3-tada": {
				description: "Reaction 🎉",
			},
			"reaction-4-clap": {
				description: "Reaction 👏",
			},
			"reaction-5-joy": {
				description: "Reaction 😂",
			},
			"reaction-6-open-mouth": {
				description: "Reaction 😮",
			},
			"reaction-7-cry": {
				description: "Reaction 😢",
			},
			"reaction-8-thinking-face": {
				description: "Reaction 🤔",
			},
			"reaction-9-thumbs-down": {
				description: "Reaction 👎",
			},
		},
	},
	outDirTemplate: "{{browser}}-mv{{manifestVersion}}",
});
