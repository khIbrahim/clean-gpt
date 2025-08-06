function getInstance() {
    const messages = document.querySelectorAll('article[data-testid^="conversation-turn"]');
    return new Mark(messages);
}

const HIGHLIGHT_TAG = 'current'
let currentIndex = 0
let matches = []

function jumpTo() {
    if(! matches.length){
        return;
    }

    matches.forEach(mark => mark.classList.remove(HIGHLIGHT_TAG))

    const currentEl = matches[currentIndex]
    if(! currentEl){
        return;
    }

    currentEl.classList.add(HIGHLIGHT_TAG)

    const parent = currentEl.closest('article[data-testid^="conversation-turn"]')
    if(parent){
        parent.style.display = ''
    }

    scrollToElement(currentEl)
}

function scrollToElement(el){
    setTimeout(() => {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        })
    }, 50);
}

function updateResults() {
    matches = Array.from(document.querySelectorAll('mark'))
    currentIndex = 0

    if(matches.length > 0){
        setTimeout(jumpTo, 500)
    }

    if (window.updateVisibleMessages) {
        window.updateVisibleMessages();
    }
}

function clearSearch() {
    getInstance().unmark()
    matches = []
    currentIndex = 0

    if (window.updateVisibleMessages) {
        window.updateVisibleMessages();
    }
}

function onInput(val){
    clearSearch()

    if (!val) return;

    getInstance().mark(val, {
        separateWordSearch: true,
        done: updateResults
    })
}

function onEnter(shift) {
    if (! matches?.length) {
        return;
    }

    if(shift){
        prev()
    } else {
        next()
    }

    jumpTo()
}

function prev() {
    currentIndex -= 1
    if (currentIndex < 0){
        currentIndex = matches.length - 1
    }
}

function next() {
    currentIndex += 1
    if(currentIndex > matches.length - 1){
        currentIndex = 0
    }
}

function getCountText() {
    return matches.length ? `${currentIndex + 1}/${matches.length}` : `0/0`
}