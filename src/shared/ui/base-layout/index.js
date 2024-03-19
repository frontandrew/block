import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('BaseLayout', template)

export class BaseLayout extends Block {

    render() {
        return template
    }
}
