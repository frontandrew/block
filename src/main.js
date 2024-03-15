import { BaseLayout, Button, Text, FieldsContainer, ActionsContainer, Form, Field, Input } from './shared';

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const layout = new class Layout extends BaseLayout {
    constructor(props) {
        super({
            ...props,

            title: new Text({ text: 'Authorization',  tag: 'h1' }),

            form: new Form({

                fields: new class Fields extends  FieldsContainer {
                    constructor(props) {
                        super({
                            ...props,

                            login: new Field({
                                name: 'login',
                                type: 'text', 
                                label: 'Login',
                                help: 'Exmple: useremail@domen.com',
                                error: null,
                                value: 'VALERA',
                                // onChange: function(e) {
                                //     console.log('CHANGE:', { e, value: e.target.value });
                                // },
                                // onInput: function(e) {
                                //     console.log('INPUT:', { e, value: e.target.value, this: this });
                                // },
                            }),

                            password: new Field({
                                name: 'password',
                                type: 'password',
                                label: 'Password',
                                help: 'Some help text',
                                error: null,
                                // onChange: function(e) {
                                //     console.log('CHANGE:', { e, value: e.target.value });
                                // },
                                // onInput: function(e) {
                                //     console.log('INPUT:', { e, value: e.target.value, this: this });
                                // },
                            }),
                        })
                    }

                    render () {
                        return `{{#>FieldsContainer}}{{{login}}}{{{password}}}{{/FieldsContainer}}`
                    }                    
                    
                },
                
                actions: new class Actions extends ActionsContainer {
                    constructor(props) {
                        super({ 
                            ...props,
                            button: new Button({
                                label: 'Submit',
                                onClick: function(e) {
                                    console.log('BUTTON CLICK:', e);
                                }
                            }),
                        })
                    }
                
                    render() {
                        return `{{#>ActionsContainer}}{{{button}}}{{/ActionsContainer}}`
                    }
                },

                onSubmit: function(e) {            
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('FORM SUBMIT:', e );
                    this
                },
            }),
        })
    }
    
    render () {
        return `{{#>BaseLayout}} {{{title}}} {{{form}}} {{/BaseLayout}}`
    }
};

render(".app", layout);
