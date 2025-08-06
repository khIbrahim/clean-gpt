let searchActive = false

function enterSearchMode() {
    searchActive = true
}

function leaveSearchMode() {
    searchActive = false
}

function isSearchActive() {
    return searchActive
}