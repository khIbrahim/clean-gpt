let allMessages         = []
let currentVisibleCount = 20
let scrollElement       = null
let loadButton          = null

const BATCH_SIZE = 20

function getScrollContainer() {
    if(! scrollElement){
        scrollElement = document.querySelector('main .flex.h-full.flex-col.overflow-y-auto')
    }

    return scrollElement
}

function updateVisibleMessages() {
    allMessages.forEach((messageEl, index) => {
        if(isSearchActive()){
            const hasMark = messageEl.querySelectorAll("mark").length > 0
            messageEl.style.display = hasMark ? '' : 'none'
        } else {
            messageEl.style.display = index >= allMessages.length - currentVisibleCount ? '' : 'none'
        }
    })

    if(currentVisibleCount >= allMessages.length && loadButton && ! isSearchActive()){
        loadButton.hide()
    }
}

function loadMoreMessages() {
    if(currentVisibleCount >= allMessages.length){
        return;
    }

    currentVisibleCount += BATCH_SIZE
    updateVisibleMessages()
}

function handleScroll() {
    const container = getScrollContainer()
    if(! container){
        return;
    }

    container.addEventListener('scroll', () => {
        if(! isSearchActive() && container.scrollTop <= 50){
            loadMoreMessages()
        }

        if(container.scrollTop <= 100){
            loadButton?.show()
        } else {
            loadButton?.hide()
        }
    })
}

function initMessages(messages){
    allMessages = messages

    const container = getScrollContainer()
    if(! container){
        return requestAnimationFrame(() => initMessages(messages))
    }

    if(! document.getElementById('clean-gpt-load-btn')){
        loadButton = new LoadMoreButton(loadMoreMessages)
    }

    handleScroll()
}