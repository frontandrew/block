import { Block } from '../core';

class Button extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("button", props);
    }
  
    render() {
        // В проекте должен быть ваш собственный шаблонизатор
        return `<div>${this.props.text}</div>`;
    }
}

export { Button }
