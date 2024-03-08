import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
 
import { EventBus } from '../event-bus';

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };
  
    #element = null;
    id = null;
    #meta = null;
    count = 0;
  
    constructor(properties = {}) {
        const { props, children } = this.#separatePropsAndChildren(properties)
        const eventBus = new EventBus();

        this.id = nanoid(8);
        this.#meta = { props };
        this.children = children;
        this.props = this.#makePropsProxy(props);    
        this.eventBus = () => eventBus;
    
        this.#registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    #separatePropsAndChildren(args) {
        const props = {};
        const children = {};
    
        Object.entries(args).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
    
        return { props, children };
    }

    #registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.#init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    }

    #addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this.#element?.addEventListener(eventName, events[eventName]);
        });
    }

    #init() {
        console.log(`INIT[${this.#element}:${this.id}]`)
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init() {}

    #componentDidMount() {
        console.log(`#CDM[${this.#element.localName}:${this.id}]`)
        this.componentDidMount();
    }

    componentDidMount(oldProps) {}

    dispatchComponentDidMount() {
        console.log(`#dispCDM[${this.#element.localName}:${this.id}]`)
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    #componentDidUpdate(oldProps, newProps) {
        console.log(`#CDU[${this.#element.localName}:${this.id}]`, newProps)

        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
            return true;
        }

        return false;
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = nextProps => {
        if (!nextProps) {
            console.warn(`Properties not passed.`);
            return
        }
        console.log(`---`)
        console.log(`SETPRS[${this.#element.localName}:${this.id}]`, nextProps)

        this.props = { ...this.props, ...nextProps }

        // Object.assign(this.props, nextProps);

        // for (const [key, value] of Object.entries(nextProps)) {
        //     console.log(`set[${key}]:${this.props[key]} > ${value}`)
        //     this.props[key] = value
        // }
        console.log(`---`)
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };

    get element() {
        return this.#element;
    }

    compile(template, context) {
        const contextAndStubs = {...context, __refs: this.refs};
    
        Object.entries(this.children).forEach(([key, child]) => {
            contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
        })
    
        const html = Handlebars.compile(template)(contextAndStubs);    
        const temp = document.createElement('template');
    
        temp.innerHTML = html;
        contextAndStubs.__children?.forEach(({embed}) => {
            embed(temp.content);
        });
    
        Object.values(this.children).forEach((child) => {
            const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
            stub?.replaceWith(child.getContent());
        })
    
        return temp.content;
    }

    #render() {
        const fragment = this.compile(this.render(), this.props);    
        const newElement = fragment.firstElementChild;
    
        if (this.#element) {
          this.#element.replaceWith(newElement);
        }
    
        this.#element = newElement;    
        this.#addEvents();
        console.log(`RNDR[${this.#element.localName}:${this.id}]::${++this.count}`, this.props)
    }

    render() {}

    getContent() {
        return this.element;
    }

    #makePropsProxy(props) {
        // const self = this;

        const proxyProps = new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },

            set(target, prop, value) {
                // const oldTarget = {...target}
                target[prop] = value;
  
                // self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true
            },
            
            deleteProperty() {
                throw new Error('Propertys delete is not allowed.');
            },
        });

        return proxyProps;
    }
    
    show() {
        this.getContent().style.display = "block";
    }
    
    hide() {
        this.getContent().style.display = "none";
    }
}

export { Block }