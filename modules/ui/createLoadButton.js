class LoadMoreButton {
    constructor(onClick) {
        this.button = document.createElement('button');
        this.button.setAttribute('aria-label', 'Load more messages');
        this.button.className = 'clean-load-btn hide';
        this.button.id = 'clean-gpt-load-btn';

        const content = document.createElement('div');
        content.className = 'content';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.classList.add('icon');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M7 14l5-5 5 5');
        svg.appendChild(path);

        const text = document.createElement('span');
        text.textContent = 'Load more';

        content.appendChild(svg);
        content.appendChild(text);
        this.button.appendChild(content);

        this.button.addEventListener('click', () => {
            onClick();
            this.hide();
        });

        document.body.appendChild(this.button);
    }

    show() {
        this.button.classList.remove('hide');
        this.button.classList.add('show');
    }

    hide() {
        this.button.classList.remove('show');
        this.button.classList.add('hide');
    }

    get element() {
        return this.button;
    }
}