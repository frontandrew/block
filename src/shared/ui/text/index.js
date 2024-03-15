import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Text', template)

export class Text extends Block {
    constructor(props = {}) {
        super({ tag: 'span', ...props });
    }

    render() {
        return template
    }
};
