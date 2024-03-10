import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

export class Button extends Block {
    constructor(props) {
        super('button', { type: 'filled', ...props });
    }

    render() {
        return template
    }
}
