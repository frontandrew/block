import { validators } from '../core';
import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Field', template)

export class Field extends Block {
    constructor(props = {}) {
        super({
            onChange: (event) => this._setValue(event),
            validator: validators[props.name],
            ...props,
        });
    }
    
    _setValue(event) {
        this.setProps({
            value: event.target.value
        })
    }

    toggleError(error) {
        this.setProps(error)
    }

    validate() {
        const validationState = this.props.validator(this.props.value);
        this.toggleError(validationState);
    }

    render() {
        return template
    }
}