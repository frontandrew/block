import { List } from '../../../../shared';
import { ItemChats } from '../item-chats';

import template from './template.hbs?raw';
import './style.css'

export class ListChats extends List {
    constructor(props) {
        super({
            itemClass: ItemChats,
            ...props,
        })
    }
    /** Этот компонент не нужен, заменьть на @partial-block List */
    render() {
        return template;
    }
}
