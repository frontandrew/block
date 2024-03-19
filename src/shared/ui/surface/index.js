import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Surface', template)

export class Surface extends Block {

    render() {
        return template
    }
}
