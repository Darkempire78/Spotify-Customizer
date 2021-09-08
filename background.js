chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.storage.sync.get(["themeSelected", "blockSubscribeButton", "addLyricsButton"], function (obj) {
            
            let themeSelected = obj ? obj.themeSelected : "default.css";
            let blockSubscribeButton = obj && typeof obj.blockSubscribeButton === 'boolean' ? obj.blockSubscribeButton : true;
            let addLyricsButton = obj && typeof obj.addLyricsButton === 'boolean' ? obj.addLyricsButton : true;

            if (blockSubscribeButton == true) {
                chrome.scripting.insertCSS({
                    target: { tabId: tabId },
                    files: [`./removePremiumButton.css`]
                })
                .then(() => {
                    console.log("Subscribe button removed");
                })
                .catch(err => console.log(err));
            }

            if (addLyricsButton == true) {
                chrome.scripting.executeScript({
                    target: {tabId: tabId},
                    files: ['addLyrics.js'],
                })
                .then(() => {
                    console.log("Lyrics button added");
                })
                .catch(err => console.log(err));
            }

            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: [`./themes/${themeSelected}`]
            })
            .then(() => {
                console.log("Theme injected");
            })
            .catch(err => console.log(err));
        });
    }
});