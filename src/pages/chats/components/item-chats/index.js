import { Block } from '../../../../shared/ui/core';
import { Avatar } from '../../../../shared';

import template from './template.hbs?raw';
import './style.css'

export class ItemChats extends Block {
    constructor({ avatar, ...props}) {
        super({
            avatar: new Avatar(avatar),
            
            name: 'Undefined',
            active: false,
            ...props,
        })
    }

    toggleActive() {
        this.setProps({ active: !this.props.active })
    }

    render() {
        return template;
    }
}
