function save_options() {
    let blockPromotedTweets = document.getElementById('blockPromotedTweets').checked;
    let blockPromotedTrends = document.getElementById('blockPromotedTrends').checked;

    chrome.storage.sync.set({
        blockPromotedTweets: blockPromotedTweets,
        blockPromotedTrends: blockPromotedTrends,
    }, function() {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
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
        blockPromotedTweets: true,
        blockPromotedTrends: true
    }, function(items) {
        console.log(items)
        document.getElementById('blockPromotedTweets').checked = items.blockPromotedTweets;
        document.getElementById('blockPromotedTrends').checked = items.blockPromotedTrends;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);