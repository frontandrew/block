import { EventBus } from '../event-bus';

class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_RENDER: "flow:render",
      FLOW_CDU: "flow:component-did-update"
    };
  
    _element = null;
    _meta = null;
  
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
  
    setProps = nextProps => {
        if (!nextProps) throw Error("Свойства не переданы");
        console.log('NewProps:', nextProps)

        for (const [key, value] of Object.entries(nextProps)) {
            this.props[key] = value
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };
    
    get element() {
        return this._element;
    }
    
    _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = block;
        this.count = ++this.count;
        console.log(`render count: ${this.count}`)
    }
    
    // Может переопределять пользователь, необязательно трогать
    render() {}
    
    getContent() {
        return this.element;
    }
    
    _makePropsProxy(props) {
        console.log('makeProxyProps', props)
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
              
              target[prop] = value;
              return true
            },
            
            deleteProperty() {
                throw Error('Нет прав');
            }
        });

        return proxyProps;
    }
    
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    
    show() {
        this.getContent().style.display = "block";
    }
    
    hide() {
        this.getContent().style.display = "none";
    }
}

export { Block }