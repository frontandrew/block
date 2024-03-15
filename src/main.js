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
            submit: new Button({
                ...props.submit,
            }),
            onSubmit: (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.someFn()
                this.processEvent(e)
                return e
            },
            onChange: (e) => {
                this.processEvent(e)
            },
            onReset: (e) => {
                this.processEvent(e)
            },
        })

        this._count = 0;
    }

    processEvent(event) {
        console.log('FORM EVENT', event)
        const { type, target } = event;
        if (type === 'change') {
            this.children[target.name].validate()
        }

        if (type === 'submit') {

        }
        
        if (type === 'reset') {

        }
    }

    someFn() {
        this.children.submit.setProps({
            label: `Submitted: ${++this._count}`
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
                },
                login: {                    
                    name: 'login',
                    type: 'text', 
                    label: 'Login',
                    value: 'VALERA',
                },
                submit: {
                    label: 'Submit',
                    type: 'submit',
                },
            }),
        })
    }
    
    render () {
        return `{{#>BaseLayout}} {{{title}}} {{{form}}} {{/BaseLayout}}`
    }
};

render(".app", new layout());
