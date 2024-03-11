import { BaseLayout, Button, Text } from './shared';

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

const button = new Button({ label: 'SUBMIT' });
const text = new Text({ text: 'Authorization',  tag: 'h1' });

const layout = new BaseLayout({
    mainTitle: text,
    submitButton: button,
});





render(".app", layout);

// setTimeout(() => {
//     render(".app", button);
// }, 2000);
// setTimeout(() => {
//     button.setProps();
// }, 1000);
// setTimeout(() => {
//     button.setProps({
//         label: 'Click 2',
//         type: 'text',
//     });
// }, 1000);
// setTimeout(() => {
//     button.setProps({
//         label: 'Click 2',
//         type: 'text',
//     });
// }, 2000);
// setTimeout(() => {
//     title.setProps();
//     console.log('title write props:', { ...button })
// }, 4000);

window.layout = layout;