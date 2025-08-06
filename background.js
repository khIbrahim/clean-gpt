chrome.commands.onCommand.addListener((command) => {
    if (command === "open-cleangpt-search") {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            chrome.tabs.sendMessage(tab.id, { action: "injectSearchBox" });
        });
    }
});
