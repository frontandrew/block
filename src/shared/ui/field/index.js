import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Field', template)

export class Field extends Block {
    constructor(props = {}) {
        super({
            onChange: (event) => this._setValue(event),
            ...props,
        });
    }
    
    _setValue(event) {
        this.setProps({
            value: event.target.value
        })
    }

    render() {
        return template
    }
}