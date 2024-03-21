import { Block } from '../core';

import { Default } from '../../../assets/images'
import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Avatar', template)

export class Avatar extends Block {
    constructor(props = {}) {
        super({
            source: Default,
            size: 'medium',
            ...props
        });
    }

    render() {
        return template
    }
}
