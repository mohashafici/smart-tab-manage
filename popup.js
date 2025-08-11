document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("saveSession");
    const restoreButton = document.getElementById("restoreSession");
    const closeDuplicatesButton = document.getElementById("closeDuplicates");
    const clearAllSessionsButton = document.getElementById("clearAllSessions");
    const setTabBackgroundButton = document.getElementById("setTabBackground");
    const sessionList = document.getElementById("sessionList");

    function updateSessionList() {
        chrome.storage.local.get("savedSessions", function (data) {
            sessionList.innerHTML = "";
            let savedSessions = data.savedSessions || {};
            Object.keys(savedSessions).forEach(sessionName => {
                let listItem = document.createElement("li");
                listItem.textContent = sessionName;
                listItem.addEventListener("click", function () {
                    savedSessions[sessionName].forEach(url => {
                        chrome.tabs.create({ url: url });
                    });
                });
                sessionList.appendChild(listItem);
            });
        });
    }

    saveButton.addEventListener("click", function () {
        let sessionName = prompt("Enter session name:");
        if (!sessionName) return;
        
        chrome.tabs.query({}, function (tabs) {
            let tabUrls = tabs.map(tab => tab.url);
            chrome.storage.local.get("savedSessions", function (data) {
                let savedSessions = data.savedSessions || {};
                savedSessions[sessionName] = tabUrls;
                chrome.storage.local.set({ savedSessions }, () => {
                    updateSessionList();
                    alert("Session Saved!");
                });
            });
        });
    });

    restoreButton.addEventListener("click", function () {
        chrome.storage.local.get("savedSessions", function (data) {
            let savedSessions = data.savedSessions || {};
            if (Object.keys(savedSessions).length === 0) {
                alert("No saved sessions found!");
                return;
            }
    
            let sessionNames = Object.keys(savedSessions);
            let sessionToRestore = prompt("Enter session name to restore:\n" + sessionNames.join("\n"));
            if (!sessionToRestore || !savedSessions[sessionToRestore]) {
                alert("Invalid session name!");
                return;
            }
    
            savedSessions[sessionToRestore].forEach(url => {
                chrome.tabs.create({ url: url });
            });
        });
    });
    

    clearAllSessionsButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to clear all saved sessions?")) {
            chrome.storage.local.remove("savedSessions", function () {
                updateSessionList();
                alert("All saved sessions cleared.");
            });
        }
    });

    closeDuplicatesButton.addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "closeDuplicates" }, response => {
            if (response && response.message) {
                alert(response.message);
            }
        });
    });

    setTabBackgroundButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) return;
    
            let tab = tabs[0];
    
            // Prevent errors on chrome:// pages
            if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
                alert("This action cannot be performed on a chrome:// or edge:// page.");
                return;
            }
    
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => { document.body.style.backgroundColor = "#f4e2d8"; }
            }).catch(error => console.error("Error executing script:", error));
        });
    });
    
    

    updateSessionList();
});
