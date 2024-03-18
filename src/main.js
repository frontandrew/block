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
                this.processEvents(e)
                return e;
            },
            onChange: (e) => {
                this.processEvents(e)
                return e;
            },
            onReset: (e) => {
                this.processEvents(e)
            },

            touched: false,
            hasError: false,
        })

        this._count = 0;
    }

    processEvents(event) {
        console.log('FORM EVENT', event)
        const { type, target } = event;
        if (type === 'change') {
            // this.injectMethods()
        }

        if (type === 'submit') {
            const formErrorState = Object.values(this.children)
                .reduce((acc, child) => {
                    if ('validate' in child) return [...acc, child.validate()]
                    return acc;
                }, [])
                .some(Boolean)
                this.setSubmitState(formErrorState)
        }
        
        if (type === 'reset') {

        }
    }

    setSubmitState(state) {
        this.children['submit'].setDisabled(state);
    }    

    // getErrorState() {
    //     const state = {}
    //     Object.entries(this.children).forEach(([key, value]) => {
    //         if ('getState' in value) {
    //             state[key] = value.getState().hasError
    //         }
    //     })
    //     console.warn('FORM INPUTS STATE:', state)
    //     return state;
    // }

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
                    value: 'gd',
                },
                login: {                    
                    name: 'login',
                    type: 'text', 
                    label: 'Login',
                    value: 'ра',
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
