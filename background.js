chrome.runtime.onInstalled.addListener(() => {
    console.log("Smart Tab Manager Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "closeDuplicates") {
        let seenUrls = new Set();
        let duplicateTabs = [];

        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                if (seenUrls.has(tab.url)) {
                    duplicateTabs.push(tab.id);
                } else {
                    seenUrls.add(tab.url);
                }
            });

            if (duplicateTabs.length > 0) {
                chrome.tabs.remove(duplicateTabs, () => {
                    sendResponse({ message: "Duplicate tabs closed." });
                });
            } else {
                sendResponse({ message: "No duplicate tabs found." });
            }
        });
        return true;
    }
});
