import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

export class Input extends Block {
    constructor(props = {}) {
        super({
            name: 'input',
            type: 'text',
            onChange: (e) => this._setValue(e),
            onBlur: () => this._validate(),
            ...props,
        });
      
    }

    _setValue(e) {
        this.setProps({ value: e.target.value })
    }

    _validate() {
        const value = this.props.value;

        // использовать валидатор
        if(value === '1234') this.setProps({ error: true })
        else this.setProps({ error: false })
    }
    
    render() {
        return template
    }
};
