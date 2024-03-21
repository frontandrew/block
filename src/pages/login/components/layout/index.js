import { Block } from '../../../../shared/ui/core';
import { Button, Field, Text } from '../../../../shared';

import { FormAuth } from '../form-auth';

import template from './template.hbs?raw';
import './style.css'

export class Layout extends Block {
    constructor({ title, form, ...layoutProps }) {
        const { submit, reset, login, password, ...formProps } = form;
        super({            
            title: new Text(title),
            form: new FormAuth({
                submit: new Button(submit),
                reset: new Button(reset),
                login: new Field(login),
                password: new Field(password),

                ...formProps,
            }),

            ...layoutProps,
        })
    }

    render() {
        return template;
    }
}
