import { FormAuth } from "./componets";
import { Layout } from "./layout";

export class PageLogin extends Layout {
    constructor(props) {
        super({
            form: new FormAuth({
                title: {
                    tag: 'h1',
                    text: 'Authtorisation',
                    /**
                     * Пришлось передать специальные стили через
                     * конструктор блока, нужно придумать что то...
                     */
                    class: 'form-auth__title',
                },
                password: {
                    name: 'password',
                    type: 'password',
                    label: 'Password',
                    required: true,
                    value: '!Q1qwert',
                },
                login: {                    
                    name: 'login',
                    type: 'text', 
                    label: 'Login',
                    required: true,
                    value: 'And',
                },
                submit: {
                    label: 'Sign in',
                    type: 'submit',
                },
                reset: {
                    label: 'Sign up',
                    type: 'reset',
                    variant: 'link',
                },
            }),
        })
    }
};