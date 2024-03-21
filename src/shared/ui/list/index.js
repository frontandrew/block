import { Block } from '../core';

import template from './template.hbs?raw';
import './style.css'

import Handlebars from 'handlebars';
Handlebars.registerPartial('List', template)

export class List extends Block {
    constructor(props = {}) {
        super({
            items: [],
            // itemClass: Block, // похоже нужно создать класс по умолчаниюю
            ...props,
        });
    }

    _render() {        
        const element = this.createDOMElement();

        if (this._element) this._element.replaceWith(element);
        this._element = element;
        
        this._attachEvents();

        this.children = this.props.items.reduce((acc, item) => {
            const child = new this.props.itemClass(item)
            return { ...acc, [`${child.id}`]: child }
        }, {});

        Object.values(this.children).forEach((child) => {
            this._element.appendChild(child.getContent());
        });

        console.log(`RNDR[${this.instance + ':' + this.id}]::${++this.count}`, this)
    }

    render() {
        return template;
    }
}