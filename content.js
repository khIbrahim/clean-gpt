chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectSearchBox") {
        initSearchBox({
            onInput,
            onEnter,
            onClear: clearSearch,
            onNext: next,
            onPrev: prev,
            getCountText
        });
    }
});

const waitForMessages = (callback) => {
    const messages = document.querySelectorAll('article[data-testid^="conversation-turn"]');
    if (messages.length > 0) {
        callback(Array.from(messages));
    } else {
        requestAnimationFrame(() => waitForMessages(callback));
    }
};

waitForMessages((messages) => {
    handleMessages(messages)
    observeNewMessages()
});
handleSearch();