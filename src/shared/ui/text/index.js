import Handlebars from 'handlebars';

import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

export class Text extends Block {
    constructor(props = {}) {
        super({ tag: 'span', ...props });
    }

    render() {
        return template
    }
}

// Handlebars.registerPartial('Text', template)