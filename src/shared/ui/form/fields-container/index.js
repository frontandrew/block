import { Block } from '../../core';

import template from './template.hbs?raw';
import './style.css'

export class FieldsContainer extends Block {
    constructor(props = {}) {
        super(props);
    }

    render() {
        return template
    }
};
