chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.storage.sync.get(["themeSelected"], function (obj) {
            let themeSelected = obj ? obj.themeSelected : "aaaaaaaaa";
            console.log("themeSelected:")
            console.log(themeSelected)
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