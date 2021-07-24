chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./themes/dracula.css"]
        })
        .then(() => {
            console.log("Theme injected");
        })
        .catch(err => console.log(err));
    }
});