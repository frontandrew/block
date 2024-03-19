import { Button, Field, Form, Text } from '../../../../shared';

import template from './template.hbs?raw';
import './style.css'

export class FormAuth extends Form {
    constructor(props) {
        super({
            title: new Text(props.title),
            login: new Field(props.login),
            password: new Field(props.password),
            submit: new Button(props.submit),
            reset: new Button(props.reset),
        })
    }

    render() {
        return template;
    }
}
