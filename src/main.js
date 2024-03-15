import { BaseLayout, Button, Text, FieldsContainer, ActionsContainer, Form, Field, Input } from './shared';

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const passwordField = class PasswordField extends Field {
    constructor(props) {
        super({
            ...props
        })
    }
}

const authForm = class AuthForm extends Form {
    constructor(props) {
        super({
            login: new Field(props.login),
            password: new passwordField(props.password),
            submit: new Button({
                ...props.submit,
            }),
            onSubmit: (e) => {
                console.warn('Submit!!')
                e.preventDefault();
                e.stopPropagation();
                this.someFn()
                return e
            },
            onChange: () => {
                this.validate()
            },
            onReset: () => {}
        })

        this._count = 0;
    }    

    validate() {
        const { login, password } = this.getPropsChildren();
        console.log('FORM Values:', { login: login.value, password: password.value } );
    }

    someFn() {
        // this.children.submit.props = { label: `Submitted: ${++this._count}` }
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
                    help: 'Exmple: useremail@domen.com',
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
