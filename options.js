async function save_options() {
    let themeSelected = document.getElementById('themeSelector').value;
    let blockSubscribeButton = document.getElementById('blockSubscribeButton').checked;
    let blockSubscribeModal = document.getElementById('blockSubscribeModal').checked;
    let addLyricsButton = document.getElementById('addLyricsButton').checked;

    chrome.storage.sync.set({
        themeSelected: themeSelected,
        blockSubscribeButton: blockSubscribeButton,
        blockSubscribeModal: blockSubscribeModal,
        addLyricsButton: addLyricsButton,
    }, function() {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
    
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value
    chrome.storage.sync.get({
        themeSelected: "default.css",
        blockSubscribeButton: true,
        blockSubscribeModal: true,
        addLyricsButton: true
    }, function(items) {
        console.log(items)
        document.getElementById('themeSelector').value = items.themeSelected;
        document.getElementById('blockSubscribeButton').checked = items.blockSubscribeButton;
        document.getElementById('blockSubscribeModal').checked = items.blockSubscribeModal;
        document.getElementById('addLyricsButton').checked = items.addLyricsButton;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);