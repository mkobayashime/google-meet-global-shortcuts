export default defineBackground(() => {
  chrome.commands.onCommand.addListener((command) => {
    void (async () => {
      switch (command) {
        case "toggle-audio":
        case "toggle-camera": {
          const tabs = await chrome.tabs.query({
            url: "https://meet.google.com/*",
          });
          const tabIDs = tabs.flatMap(({ id }) =>
            id === undefined ? [] : [id],
          );

          if (tabIDs.length === 0) {
            return;
          }

          if (tabIDs.length > 1) {
            chrome.notifications.create({
              title: chrome.runtime.getManifest().name,
              message:
                "Error: Multiple tabs of Google Meet exist. Please close unnecessary ones and keep one.",
              type: "basic",
              iconUrl: "icon/128.png",
            });

            return;
          }

          const [targetTabID] = tabIDs;

          void chrome.tabs.sendMessage(targetTabID, {
            type: command === "toggle-audio" ? "toggleAudio" : "toggleCamera",
          });
          break;
        }
        default: {
          break;
        }
      }
    })();
  });
});
