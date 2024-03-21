import { Block } from '../../../../shared/ui/core';

import template from './template.hbs?raw';
import './style.css'

export class ItemChats extends Block {
    constructor(props) {
        super({
            name: 'Undefined',
            ...props,
        })
    }

    render() {
        return template;
    }
}
