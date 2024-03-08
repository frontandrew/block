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
    label: 'Click!!',
    type: 'text',
})  

setTimeout(() => {
    render(".app", button);
}, 2000);
setTimeout(() => {
    button.setProps({
        label: 'Click me, please',
        type: 'filled',
    });
    // console.log('button write props:', { ...button })
}, 3000);
// setTimeout(() => {
//     title.setProps();
//     console.log('title write props:', { ...button })
// }, 4000);





window.components = {
    button,
    // title,
}