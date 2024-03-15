import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Button', template)

export class Button extends Block {
    constructor(props = {}) {
        super({ type: 'filled', ...props });
    }

    render() {
        return template
    }
}
