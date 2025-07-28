const findMeetTab = async () => {
	const tabIDs = (
		await chrome.tabs.query({
			url: "https://meet.google.com/*",
		})
	).flatMap(({ id }) => (id === undefined ? [] : [id]));

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
					});
					break;
				}
				case "activate-meet-tab": {
					const targetTabID = await findMeetTab();
					if (!targetTabID) return;

					void chrome.tabs.update(targetTabID, { active: true });

					break;
				}
				default: {
					break;
				}
			}
		})();
	});
});
