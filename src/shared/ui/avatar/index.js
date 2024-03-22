import { Block } from '../core';

import { DefaultPic } from '../../../assets/images'
import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('Avatar', template)

export class Avatar extends Block {
    constructor(props = {}) {
        super({
            defaultPic: DefaultPic,
            size: 'medium',
            ...props
        });
    }

    render() {
        return template
    }
}
