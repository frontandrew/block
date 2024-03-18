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
            onFocusout: () => this.validate(),
            validator: validators[props.name],
            touched: false,
            hasError: false,
            textError: null,
            textHelp: null,
            ...props,
        });
    }
    
    _setValue(event) {
        this.setProps({
            value: event.target.value
        })
    }

    setState(state) {
        this.setProps(state)
    }

    validate() {
        // console.warn(this)
        const validationState = this.props.validator(this.props.value);
        this.setState(validationState);
        return validationState.hasError;
    }

    render() {
        return template
    }
}