import { Layout } from "./components";

export class PageLogin extends Layout {
    constructor() {
        super({
            title: {
                tag: 'h1',
                text: 'Authorization',
                /**
                 * TODO: Пришлось передать специальные стили через
                 * конструктор блока, нужно придумать что то...
                 */
                class: 'layout-content__title',
            },
            form: {                
                password: {
                    name: 'password',
                    type: 'password',
                    label: 'Password',
                    required: true,
                    value: '!Q1qwert',

                    // inline: true,
                },
                login: {                    
                    name: 'login',
                    type: 'text', 
                    label: 'Login',
                    required: true,
                    value: 'And',

                    inline: true,
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
            },
        })
    }
};