import { validators } from '../core';
import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Field', template)

export class Field extends Block {
    constructor(props = {}) {
        super({
            onInput: (event) => {
                this._setValue(event)
                return event;
            },
            onFocusout: (event) => {
                this.validate()
                return event;
            },
            validator: validators[props.name],
            touched: false,
            hasError: false,
            textError: null,
            textHelp: null,
            required: false,

            ...props,
        });

        this._value = this.props.value
    }
    
    _setValue({ target }) {
        this._value = target.value
    }

    validate() {
        const validationState = this.props.validator({
            string: this._value,
            isRequred: this.props.required,
        });
        this.setProps({ ...validationState, value: this._value });
        // return validationState.hasError;
    } 

    render() {
        return template
    }
}