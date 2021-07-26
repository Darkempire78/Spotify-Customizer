chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.storage.sync.get(["themeSelected", "blockSubscribeButton"], function (obj) {
            
            let themeSelected = obj ? obj.themeSelected : "default.css";
            let blockSubscribeButton = obj && typeof obj.blockSubscribeButton === 'boolean' ? obj.blockSubscribeButton : true;

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