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
                return e;
            },
            onInput: (e) => {
                this.processEvents(e)
                return e;
            },
        })

        this._hasError = false;
    }

    processEvents(event) {
        if (event.type === 'input') {
            this.updateErrorState(false);
            return
        }

        if (event.type === 'change') {
            this.updateErrorState(this.getErrorState());
            return
        }

        if (event.type === 'submit') {
            this.validate();
            this.updateErrorState(this.getErrorState());

            if (!this._hasError) this.submitForm();
            return
        }
        
        if (event.type === 'reset') {
            this.resetForm();
            return
        }
    }

    setSubmitState() {
        this.children['submit'].setDisabled(this._hasError);
    }

    getErrorState() {
        const errorState = Object.values(this.getInputChildren(this))
            .reduce((acc, child) => [...acc, child.props.hasError], [])
            .some(Boolean)

        return errorState;
    }

    updateErrorState(state) {
        this._hasError = state;
        this.setSubmitState()
    }

    validate() {
        Object.values(this.getInputChildren(this)).forEach((child) => { child.validate() })
    }

    getInputChildren (instance) {
        const inputs = Object.entries(instance.children).reduce((acc, [key, value]) => {
            if (value instanceof Field) {
                return { ...acc, [key]: value };
            } 

            /**
             * можно попробовать сделать рекурсивный обход всех потомков
             * передав на вход инстанс компонента
             * 
             * UPD: реализовано, не тестировал
             */
            if (Object.keys(value.children) > 0) {
                return { ...acc, ...this.getInputChildren(value)}
            }

            return acc;
        }, {});
        return inputs;
    }

    resetForm() {
        Object.values(this.children).forEach((child) => {
            child.reset()
        });
        
        this.updateErrorState(false);
    }

    submitForm() {
        const submitted = Object.entries(this.getInputChildren(this)).reduce((acc, [key, child]) => {
            return { ...acc, [key]: child.props.value };
        }, {})

        console.warn(`FORM SUBMITTED:`, submitted)
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
