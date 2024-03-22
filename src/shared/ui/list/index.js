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

            onClick: (event) => {                
                this.processSelectEvent(event)
                return event;
            },

            ...props,
        });

        this.active = null;
    }

    processSelectEvent(event) {
        const id = this._getClickedChildId(event);

        if(id === this.active) return;
        if(this.active) {
            this.children[this.active].toggleActive();
        }

        this.active = id;        
        this.children[this.active].toggleActive();

        const { instance, _meta } = this.children[this.active];
        console.warn(`SELECTED[${instance}:${this.active}]::`, _meta.props)
    }

    _getClickedChildId(event) {
        console.log('@ITEM CLICK:', event)
        const id = event.target.parentElement.attributes.key.value;
        return id;
    }

    _render() {        
        const element = this.createDOMElement();

        if (this._element) this._element.replaceWith(element);
        this._element = element;
        
        this._attachEvents();

        this.children = this.props.items.reduce((acc, item) => {
            const child = new this.props.itemClass(item)
            return { ...acc, [`${child.props.id}`]: child }
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