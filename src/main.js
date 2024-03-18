import { BaseLayout, Button, Text, FieldsContainer, ActionsContainer, Form, Field, Input } from './shared';

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const authForm = class AuthForm extends Form {
    constructor(props) {
        super({
            login: new Field(props.login),
            password: new Field(props.password),
            submit: new Button(props.submit),
            reset: new Button(props.reset),            
        })
    }

    render() {
        return(
            `{{#>Form}}
                {{#>FieldsContainer}}
                    {{{login}}}
                    {{{password}}}
                {{/FieldsContainer}}
                {{#>ActionsContainer}}
                    {{{submit}}}
                    {{{reset}}}
                {{/ActionsContainer}}
            {{/Form}}`
        )
    }
}


const layout = class Layout extends BaseLayout {
    constructor(props) {
        super({
            ...props,

            title: new Text({ text: 'Authorization',  tag: 'h1' }),

            form: new authForm({
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
                    label: 'Submit',
                    type: 'submit',
                },
                reset: {
                    label: 'Reset',
                    type: 'reset',
                    variant: 'text',
                },
            }),
        })
    }
    
    render () {
        return `{{#>BaseLayout}} {{{title}}} {{{form}}} {{/BaseLayout}}`
    }
};

render(".app", new layout());
