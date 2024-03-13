import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import { deepEqual  } from '../../../tools';
 
import { EventBus } from '../event-bus';
export class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_RENDER: "flow:render",
      FLOW_CDU: "flow:component-did-update"
    };
  
    id = nanoid(6)
    _meta = null;
    _element = null;
  
    constructor(args = {}) {
        const eventBus = new EventBus();
        this.count = 0; // temporary

        const { props, children, events } = this._separatePropsWithCildren(args);
        
        this._meta = { props, children, events };
        this.children = this._makePropsProxy(children);
        this.props = this._makePropsProxy(props);
        this.events = this._makePropsProxy(events);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);        
        eventBus.emit(Block.EVENTS.INIT);
    }

    _separatePropsWithCildren(args) {
        const props = {};
        const children = {};
        const events = {};

        Object.entries(args).forEach(function([key, value]) {
            if (value instanceof Block) children[key] = value;
            if (key.startsWith('on')) events[key] = value;
            else props[key] = value;
        });

        return { props, children, events };
    }
  
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    
    init() {
        console.log(`INIT[${this.id}]`);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        
        const children = Object.values(this.children);
        if (children.length > 0) children.forEach((child) => this._element.append(child.element));
    }

    _render() {
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        
        const elementString = Handlebars.compile(this.render())(this.props);
        const tempElement = document.createElement('div');
        tempElement.insertAdjacentHTML('afterbegin', elementString.trim());

        const resultElement = tempElement.firstElementChild;
        resultElement.setAttribute('data-id', this.id);

        if (this._element) {
            this._element.replaceWith(resultElement);
        }        

        this._element = resultElement;
        this._attachEvents();
        console.log(`RNDR[${this._element?.nodeName + '::' + this.id}]::${++this.count}`, { ...this._meta, elem: this._element })
    }
    
    render() {}
    
    _componentDidMount() {
        this.componentDidMount();
    }
    
    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) {}
    
    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
        console.log(`dsp:CDM[${this.id}]`)
    }
    
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
            return true;
        }
        
        return false;
    }
        
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return true;
    }
  
    setProps (nextProps) {
        if (!nextProps || !Object.keys(nextProps)?.length) {
            console.warn(`Properties not passed.`);
            return;
        }

        const expectedProps = { ...this.props, ...nextProps };
        const isEqual = deepEqual(this.props, expectedProps)

        if (isEqual) {
            console.warn(`Properties arent changed.`);
            return;
        }

        for (const [key, value] of Object.entries(nextProps)) {
            console.log(`set[${key}]:${this.props[key]} > ${value}`)
            this.props[key] = value
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, nextProps, this.props);
    };
    
    get element() {
        return this._element;
    }
    
    getContent() {
        return this.element;
    }
    
    _makePropsProxy(props) {

        const proxyProps = new Proxy(props, {
            get(target, prop) {
              if (prop.indexOf('_') === 0) {
                throw Error('Нет прав');
              }
              
              const value = target[prop];
              return typeof value === "function" ? value.bind(target) : value;
            },
            
            set(target, prop, value) {
              if (prop.indexOf('_') === 0 || !value) {
                throw Error('Нет прав');
              }

              console.log(`SET:[${this.id}]`, { target, prop })
              
              target[prop] = value;
              return true
            },
            
            deleteProperty() {
                throw Error('Propertys delete is not allowed.');
            }
        });

        return proxyProps;
    }

    _attachEvents() {
        // const { events = {} } = this.props;
        if (Object.keys(this.events).length <= 0) return;

        for (const [key, value] of Object.entries(this.events)) {
            console.log(`EVENT[${this._element?.nodeName + '::' + this.id}]::${this.count}`, { ...this._meta, elem: this._element })
            this._element.addEventListener(key.toLowerCase().slice(2), value)
        }
    }
    
    show() {
        this.getContent().style.display = "block";
    }
    
    hide() {
        this.getContent().style.display = "none";
    }
}