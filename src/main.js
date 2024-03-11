import { Button, Text } from './shared';

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

// const title = new Text({
//     text: 'H1 Title Text',
//     type: 'h1',
// })
// setTimeout(() => {
//     render(".app", title);
// }, 1000);


const button = new Button({
    label: 'Click 1',
})

render(".app", button);

// setTimeout(() => {
//     render(".app", button);
// }, 2000);
// setTimeout(() => {
//     button.setProps();
// }, 1000);
setTimeout(() => {
    button.setProps({
        label: 'Click 2',
        type: 'text',
    });
}, 1000);
setTimeout(() => {
    button.setProps({
        label: 'Click 2',
        type: 'text',
    });
}, 2000);
// setTimeout(() => {
//     title.setProps();
//     console.log('title write props:', { ...button })
// }, 4000);

// const node = createNode(`<div data-id=${26254762456}></div>`);

// console.log('NODE', node)



window.components = {
    button,
    // title,
    // node: createNode(`<div data-id=${26254762456}></div>`)
}