import { Block } from '../../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('FieldsContainer', template)

export class FieldsContainer extends Block {
    constructor(props = {}) {
        super(props);
    }

    render() {
        return template
    }
};
