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
  
    constructor(props = {}) {
        const eventBus = new EventBus();
        this._meta = { props };
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
    
    init() {
        console.log(`INIT[${this.id}]`);
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

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, nextProps, this.props);
    };
    
    get element() {
        return this._element;
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
    
    show() {
        this.getContent().style.display = "block";
    }
    
    hide() {
        this.getContent().style.display = "none";
    }
}