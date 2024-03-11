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
  
    _element = null;
    _meta = null;
    id = nanoid(6)
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };
        this.count = 0; // temporary
  
        this.props = this._makePropsProxy(props);
    
        this.eventBus = () => eventBus;
    
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
  
    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }
    
    init() {
        console.log(`INIT[${this.id}]`)
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    
    _componentDidMount() {
        this.componentDidMount();
    }
    
    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) {}
    
    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
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

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    };
    
    get element() {
        return this._element;
    }
    
    _render() {
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        
        const block = Handlebars.compile(this.render())(this.props);
        // console.log('BLOCK:', block)
        this._element.innerHTML = block;

        console.log(`RNDR[${this.id}]::${++this.count}`, this.props)
    }
    
    // Может переопределять пользователь, необязательно трогать
    render() {}
    
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
    
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    
    show() {
        this.getContent().style.display = "block";
    }
    
    hide() {
        this.getContent().style.display = "none";
    }
}