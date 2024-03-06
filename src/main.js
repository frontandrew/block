import { Button } from './shared'

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
  
const button = new Button({
    text: 'Click me',
});
  
// app — это class дива в корне DOM
render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
    });
    console.log('BTN write props:', { ...button })
}, 1000);
