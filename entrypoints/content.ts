import type { Message } from "../types/message";

export default defineContentScript({
	matches: ["https://meet.google.com/*"],
	main() {
		chrome.runtime.onMessage.addListener((message: Message) => {
			void (() => {
				switch (message.type) {
					case "toggleAudio":
					case "toggleCamera": {
						document.dispatchEvent(
							new KeyboardEvent("keydown", {
								ctrlKey: true,
								key: message.type === "toggleAudio" ? "d" : "e",
							}),
						);

						/**
						 * lazy workaround for macOS as `chrome.runtime.getPlatformInfo`
						 * cannot be used in content scripts
						 */
						document.dispatchEvent(
							new KeyboardEvent("keydown", {
								metaKey: true,
								key: message.type === "toggleAudio" ? "d" : "e",
							}),
						);

						break;
					}
					case "toggleHand": {
						const combinations: KeyboardEventInit[] = [
							// Windows / Linux default shortcut
							{ ctrlKey: true, altKey: true },
							// macOS default shortcut uses Command + Option
							{ metaKey: true, altKey: true },
							// Some locales expect Control + Command
							{ ctrlKey: true, metaKey: true },
						];

						for (const combo of combinations) {
							document.dispatchEvent(
								new KeyboardEvent("keydown", {
									key: "h",
									code: "KeyH",
									...combo,
								}),
							);
						}

						break;
					}
					default: {
						break;
					}
				}
			})();
		});
	},
});
