import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

export class Button extends Block {
    constructor(props) {
        // this.props.type = 'filled';
        super(props);
    }

    render() {
        return template
    }
}
