class SearchBox {
    constructor({onInput, onEnter, onClear, onNext, onPrev, getCountText }) {
        this.onInput      = onInput;
        this.onEnter      = onEnter;
        this.onClear      = onClear;
        this.onNext       = onNext
        this.onPrev       = onPrev;
        this.getCountText = getCountText

        this.createSearchUI()
    }

    createSearchUI() {
        if(document.getElementById('cleangpt-search-overlay')){
            return;
        }

        this.overlay        = this.createOverlay()
        const inputContainer = this.createContainer()
        const searchIcon     = this.createSearchIcon()
        this.input         = this.createInput()
        inputContainer.append(searchIcon, this.input);

        this.span     = this.createSpan()
        this.prevBtn  = this.createPrevBtn()
        this.nextBtn  = this.createNextBtn()
        this.closeBtn = this.createCloseBtn()

        this.overlay.append(inputContainer, this.span, this.prevBtn, this.nextBtn, this.closeBtn);
        document.body.appendChild(this.overlay);

        this.bindEvents()

        this.input.focus()
        this.input.select()
    }

    bindEvents() {
        this.input.addEventListener("input", () => {
            const val = this.input.value.trim()
            if(val){
                this.onInput(val)
                this.updateCountDisplay()
            }
        })

        this.input.addEventListener('keydown', ev => {
            if(ev.key === 'Enter'){
                ev.preventDefault()
                this.onEnter(ev.shiftKey)
                this.updateCountDisplay()
            } else if(ev.key === 'Escape'){
                ev.preventDefault()
                this.destroy()
            }
        })

        this.nextBtn.addEventListener('click', () => {this.onNext(); this.updateCountDisplay();})
        this.prevBtn.addEventListener('click', () => {this.onPrev(); this.updateCountDisplay();})
        this.closeBtn.addEventListener('click', () => {
            this.destroy();
        })
    }

    updateCountDisplay() {
        if (typeof this.getCountText === 'function') {
            this.span.textContent = this.getCountText();
        }
    }

    show() {
        this.overlay.style.display = 'block'
        this.input.focus()
        this.updateCountDisplay()
    }

    hide() {
        this.overlay.style.display = 'none'
    }

    destroy() {
        this.onClear()
        this.overlay.remove()
    }

    createContainer() {
        const inputContainer = document.createElement('div')
        inputContainer.className = 'search-input-container'

        return inputContainer
    }

    createOverlay() {
        const overlay = document.createElement('div')
        overlay.id = 'cleangpt-search-overlay'

        return overlay
    }

    createSearchIcon() {
        const searchIcon = document.createElement('div')
        searchIcon.className = 'search-icon';
        searchIcon.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
    `

        return searchIcon
    }

    createInput() {
        const input = document.createElement('input')
        input.id = 'cleangpt-search-input'
        input.type = 'text'
        input.placeholder = 'Search in conversation...'

        return input
    }

    createSpan() {
        const span = document.createElement('span')
        span.className = 'search-count'
        span.textContent = '0/0'

        return span
    }

    createPrevBtn() {
        const prevBtn = document.createElement('button')
        prevBtn.className = 'search-nav-btn'
        prevBtn.innerHTML = `
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
    `
        prevBtn.title = 'Previous result (Shift+Enter)'

        return prevBtn
    }

    createNextBtn() {
        const nextBtn = document.createElement('button')
        nextBtn.className = 'search-nav-btn'
        nextBtn.innerHTML = `
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
    `
        nextBtn.title = 'Next result (Enter)'

        return nextBtn
    }

    createCloseBtn() {
        const closeBtn = document.createElement('button')
        closeBtn.className = 'search-close-btn'
        closeBtn.innerHTML = '×'
        closeBtn.title = 'Close search (Escape)'

        return closeBtn
    }
}

function initSearchBox(closure){
    return new SearchBox(closure)
}