function handleSearch() {
    const waitForSearchInput = () => {
        const input = document.querySelector('#cleangpt-search-input');
        if (! input) {
            return setTimeout(waitForSearchInput, 100);
        }

        input.addEventListener('input', function () {
            const val = this.value;
            if (val) {
                enterSearchMode();
            } else {
                leaveSearchMode();
            }
        });

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((node) => {
                    if (node.id === 'cleangpt-search-overlay') {
                        leaveSearchMode();
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: false
        });
    };

    waitForSearchInput();
}
