import type { Message, ReactionKind } from "../types/message";

function awaitWithInterval<T>(
	getter: () => { data: T } | false | undefined | null,
	options: {
		interval?: number;
		timeout?: number;
	} = { interval: 250, timeout: 3000 },
) {
	return new Promise<T | undefined>((resolve) => {
		let intervalID: number | undefined;

		const intervalFunction = () => {
			const data = getter();

			if (data) {
				if (intervalID !== undefined) {
					window.clearTimeout(intervalID);
				}
				resolve(data.data);
			}
		};

		intervalFunction();
		intervalID = window.setInterval(intervalFunction, options.interval);

		window.setTimeout(() => {
			window.clearInterval(intervalID);
			resolve(undefined);
		}, options.timeout);
	});
}

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
					case "reaction": {
						const kindsToEmojiDict: Record<ReactionKind, string> = {
							sparklingHeart: "💖",
							thumbsUp: "👍",
							tada: "🎉",
							clap: "👏",
							joy: "😂",
							openMouth: "😮",
							cry: "😢",
							thinkingFace: "🤔",
							thumbsDown: "👎",
						};

						// In case the reaction pallette is not expanded
						{
							// works regardless of the display language
							const emojiButtonIconElement = document.evaluate(
								"//i[text() = 'mood']",
								document,
								null,
								XPathResult.FIRST_ORDERED_NODE_TYPE,
								null,
							).singleNodeValue;
							if (!(emojiButtonIconElement instanceof HTMLElement)) break;

							const emojiButton = emojiButtonIconElement.closest("button");
							if (!emojiButton) break;

							if (emojiButton.ariaExpanded !== "true") {
								emojiButton.click();
							}
						}

						void (async () => {
							const reactionButton = await awaitWithInterval<HTMLElement>(
								() => {
									const reactionButton = document.querySelector(
										`button[aria-label='${kindsToEmojiDict[message.kind]}']`,
									);

									if (reactionButton instanceof HTMLElement) {
										return { data: reactionButton };
									}
								},
							);

							if (reactionButton) {
								reactionButton.click();
							}
						})();

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
