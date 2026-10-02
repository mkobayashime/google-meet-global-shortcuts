import type { Message } from "../types/message";

const MEET_URL_PATTERN = "https://meet.google.com/*";

const findMeetTabs = async () =>
	(await chrome.tabs.query({ url: MEET_URL_PATTERN }))
		.filter((tab) => tab.id !== undefined)
		.toSorted((a, b) => a.windowId - b.windowId || a.index - b.index);

const findActiveMeetTab = async () => {
	const [activeTab] = await chrome.tabs.query({
		active: true,
		lastFocusedWindow: true,
		url: MEET_URL_PATTERN,
	});
	return activeTab;
};

const findMeetTab = async () => {
	const activeMeetTab = await findActiveMeetTab();
	if (activeMeetTab?.id !== undefined) {
		return activeMeetTab.id;
	}

	const tabIDs = (await findMeetTabs()).flatMap(({ id }) => (id === undefined ? [] : [id]));

	if (tabIDs.length === 0) {
		return;
	}

	if (tabIDs.length > 1) {
		await chrome.notifications.create({
			title: chrome.runtime.getManifest().name,
			message:
				"Error: Multiple tabs of Google Meet exist. Please close unnecessary ones and keep one.",
			type: "basic",
			iconUrl: "icon/128.png",
		});

		return;
	}

	return tabIDs[0];
};

export default defineBackground(() => {
	chrome.commands.onCommand.addListener((command) => {
		void (async () => {
			switch (command) {
				case "toggle-audio":
				case "toggle-camera": {
					const targetTabID = await findMeetTab();
					if (!targetTabID) return;

					void chrome.tabs.sendMessage(targetTabID, {
						type: command === "toggle-audio" ? "toggleAudio" : "toggleCamera",
					} satisfies Message);
					break;
				}
				case "toggle-hand": {
					const targetTabID = await findMeetTab();
					if (!targetTabID) return;

					void chrome.tabs.sendMessage(targetTabID, {
						type: "toggleHand",
					} satisfies Message);

					break;
				}
				case "reaction-1-sparkling-heart":
				case "reaction-2-thumbs-up":
				case "reaction-3-tada":
				case "reaction-4-clap":
				case "reaction-5-joy":
				case "reaction-6-open-mouth":
				case "reaction-7-cry":
				case "reaction-8-thinking-face":
				case "reaction-9-thumbs-down": {
					const targetTabID = await findMeetTab();
					if (!targetTabID) return;

					const commandToKindDict = {
						"reaction-1-sparkling-heart": "sparklingHeart",
						"reaction-2-thumbs-up": "thumbsUp",
						"reaction-3-tada": "tada",
						"reaction-4-clap": "clap",
						"reaction-5-joy": "joy",
						"reaction-6-open-mouth": "openMouth",
						"reaction-7-cry": "cry",
						"reaction-8-thinking-face": "thinkingFace",
						"reaction-9-thumbs-down": "thumbsDown",
					} as const;

					void chrome.tabs.sendMessage(targetTabID, {
						type: "reaction",
						kind: commandToKindDict[command],
					} satisfies Message);

					break;
				}
				case "activate-meet-tab": {
					const meetTabs = await findMeetTabs();
					if (meetTabs.length === 0) return;

					// Cycle through Meet tabs: move to the next one if a Meet tab is active
					const activeMeetTab = await findActiveMeetTab();
					const currentIndex = meetTabs.findIndex(({ id }) => id === activeMeetTab?.id);
					const targetTab = meetTabs[(currentIndex + 1) % meetTabs.length];
					if (targetTab?.id === undefined) return;

					void chrome.tabs.update(targetTab.id, { active: true });
					void chrome.windows.update(targetTab.windowId, { focused: true });

					break;
				}
				default: {
					break;
				}
			}
		})();
	});
});
