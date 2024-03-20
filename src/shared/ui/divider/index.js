import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Divider', template)

export class Divider extends Block {
        
    render() {
        return template
    }
}
