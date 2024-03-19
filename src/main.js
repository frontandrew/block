import { PageLogin } from './pages';

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

render(".app", new PageLogin());
