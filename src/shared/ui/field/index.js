import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Field', template)

export class Field extends Block {
    constructor(props = {}) {
        super({
            ...props,
            onChange: (event) => this._setValue(event),
        });
    }
    
    _setValue(event) {
        console.warn('set field props')
        this.setProps({
            value: event.target.value
        })
    }

    render() {
        return template
    }
}