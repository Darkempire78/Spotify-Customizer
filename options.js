async function save_options() {
    let themeSelected = document.getElementById('themeSelector').value;

    chrome.storage.sync.set({
        themeSelected: themeSelected,
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
        themeSelected: "default.css"
    }, function(items) {
        console.log(items)
        document.getElementById('themeSelector').value = items.themeSelected;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);