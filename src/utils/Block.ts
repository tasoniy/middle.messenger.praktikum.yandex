import {nanoid} from "nanoid";
import EventBus from "./EventBus";
// import { v4 as uuidv4 } from "uuid";
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  // public is = uuidv4();
  private _element: HTMLElement | null = null;
  private _meta: { props: Record<string, unknown>};
  private eventBus: () => EventBus;

  protected props: any;
  protected children: Record<string, Block>;

  constructor(propsAndChildren : any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getPropsAndChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props
    };

    this.props = this._makePropsProxy(props);

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props).events;

    if(!events) return;

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }
  
  private _getPropsAndChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) children[key] = value;
      else if (Array.isArray(value) && value.every(v => v instanceof Block)) {
        children[key] = value;
      }
      else props[key] = value;
    })

    return { props, children };
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props).events;
 
    if (!events || !this._element) return;
    
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // private _createResources() {
  //   const { tagName } = this._meta;
  //   this._element = this._createDocumentElement(tagName!);
  // }

  protected initChildren() {

  }

  protected init() {
    // this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(oldProps?: any) {
    this.componentDidMount(oldProps);
  }

  protected componentDidMount(oldProps: any) {}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

  private _componentDidUpdate(oldProps?: any, newProps?: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected componentDidUpdate(oldProps: any, newProps: any) : boolean {
    return true;
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
  }

  protected render() : DocumentFragment {
    return new DocumentFragment();

  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string,unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string,unknown>, prop: string, value: unknown ) {
        const oldProps = { ...target }
        target[prop] = value;
        
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
  
  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public show() {
    this.getContent()!.style.display = "block";
  }

  public hide() {
    this.getContent()!.style.display = "none";
  }

  protected compile(template: (context: Record<string, unknown>) => string, context: Record<string, unknown>) {
  
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch => `<div data-id=id-"${ch.id}"></div>`));

        return;
      }

      context[key] = ` <div data-id="id-${child.id}"></div>`
    })
  
    const htmlString = template(context);
    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch => `<div data-id=id-"${ch.id}"></div>`));

        return;
      }

      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) return;

      stub.replaceWith(child.getContent()!);

    })

    return fragment.content
  }
}

export default Block;