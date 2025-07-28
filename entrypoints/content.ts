export default defineContentScript({
  matches: ["https://meet.google.com/*"],
  main() {
    chrome.runtime.onMessage.addListener((message: { type?: unknown }) => {
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
          default: {
            break;
          }
        }
      })();
    });
  },
});
