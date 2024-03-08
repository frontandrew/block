import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

export class Text extends Block {
    constructor(props) {
        super(props);
        // this.props.type = 'span';
        // this.props.text = '';
    }

    render() {
        return template
    }
}
