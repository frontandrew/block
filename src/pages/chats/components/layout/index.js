import { Block } from '../../../../shared/ui/core';
import { List } from '../../../../shared';

import { ItemChats } from '../item-chats';

import template from './template.hbs?raw';
import './style.css'

export class Layout extends Block {
    constructor({ data = [], ...layoutProps }) {
        super({
            chats: new List({
                items: data,
                itemClass: ItemChats,
            }),

            ...layoutProps,
        })
    }

    render() {
        return template;
    }
}
