import { BaseLayout, Button, Text, FieldsContainer, ActionsContainer, Form, Field } from './shared';

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






const layout = new BaseLayout({
    title: new Text({ text: 'Authorization',  tag: 'h1' }),
    form: new Form({
        fields: new FieldsContainer({
            login: new Field({
                name: 'login',
                type: 'text',
                label: 'Login',
            }),
            password: new Field({
                name: 'password',
                type: 'password',
                label: 'Password',
            }),
        }),
        actions: new ActionsContainer({
            button: new Button({
                label: 'Submit',
                onClick: (e) => console.log('BUTTON CLICK:', e )
            }),
        }),
    }),
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
//         label: 'SUBMIT',
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