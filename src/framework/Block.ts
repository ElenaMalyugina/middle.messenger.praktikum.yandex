import Handlebars from 'handlebars';

export interface BlockOwnProps {
  __children?: Array<{
    component: Block<object>;
    embed(node: DocumentFragment): void;
  }>;
  __refs?: Record<string, Element>;
}

type EventListType = Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;

export default abstract class Block<Props extends BlockOwnProps = BlockOwnProps> {
  /** Шаблонная строка, из которой будет формироваться к */
  /** Это обязательное свойство для всех компонентов, поэтому объявим его защищённым и абстрактным */
  protected abstract template: string;

  // пропсы
  protected props = {} as Props;

  private domElement: Element | null = null;

  //дочерние блоки
  protected children: Block<object>[] = [];

  //рефы
  protected refs: Record<string, Element> = {};

  /** В этом объекте ключ — это название метода, а значение — обработчик */
  protected events: EventListType = {};

  /** Если у компонента нет свойств, задаём пустой объект */
  constructor(props: Props = {} as Props) {
    this.props = props;
  }

  public element(): Element | null {
    if (!this.domElement) {
      this.render();
    }
    return this.domElement;
  }

  //метод для обновления свойств компонента
  public setProps(newProps: Partial<Props>) {
    /** Сбрасываем __children и __refs на начальное значение
     * Поскольку скрытые свойства добавляются в момент компиляции, нужно очищать их при обновлении внешних свойств:*/

    // Пока предположим, что свойства простые и в объекте
    const isNeedRerender  = this.isNeedRerender(newProps, this.props);

    if(isNeedRerender){
      this.props = { ...this.props, ...newProps, __children: [], __refs: {} } as Props;
      this.render();
    }
  }

  //Проверка, нужно ли перерендерить
  // Пока предположим, что свойства простые и в объекте
  private isNeedRerender(newProps: Partial<BlockOwnProps>, oldProps: BlockOwnProps): boolean {
    return (Object.keys(newProps) as Array<keyof BlockOwnProps>).some(
      key => newProps[key] !== oldProps[key]
    );
  }

  /** В базовом классе здесь ничего нет */
  protected componentDidMount() {}

  /** Метод для общей mount-логики и вызова componentDidMount */
  private mountComponent() {
    this.attachListeners();
    this.componentDidMount();
  }

  /** В базовом классе здесь ничего нет */
  protected componentWillUnmount() {}

  /** Метод для общей unmount-логики и вызова componentWillUnmount */
  private unmountComponent() {
    /** Проверка наличия элемента, нужно для первого рендера */
    if (this.domElement) {
        /** Вызываем очистку в порядке, обратном созданию */
      this.children.reverse().forEach(child => child.unmountComponent());

      this.componentWillUnmount();
      this.removeListeners();
    }
  }

  private get validEvents(): Array<keyof HTMLElementEventMap>  {
    return Object.keys(this.events) as Array<keyof HTMLElementEventMap>;
  }


  private attachListeners() {
    for (const eventName of this.validEvents) {
      const eventCallback = this.events[eventName];
      if (typeof eventCallback == 'function' && this.domElement) {
        this.domElement.addEventListener(eventName, eventCallback);
      }
    }
  }

  private removeListeners() {
    for (const eventName of this.validEvents) {
      const eventCallback = this.events[eventName];
      if (typeof eventCallback === 'function' && this.domElement) {
        this.domElement.removeEventListener(eventName, eventCallback);
      }
    }
  }


  protected render() {
    this.unmountComponent();
    const fragment = this.compile();

    /** Если элемент уже существовал, обновляем его по имеющейся ссылке */
    if (this.domElement && fragment) {
      this.domElement.replaceWith(fragment);
    }
    this.domElement = fragment;
    this.mountComponent();
  }

  //Компиляция шаблона hbs
  private compile(): Element | null {
    const html = Handlebars.compile(this.template)(this.props);
    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    const fragment = templateElement.content;

    if (this.props.__children) {
      this.children = this.props.__children.map((child) => child.component);

      this.props.__children.forEach((child) => {
        child.embed(fragment);
      });
    }

    const defaultRefs = this.props?.__refs ?? {};
    this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce(
      (list, element) => {
        const key = element.getAttribute('ref') as string;
        list[key] = element as HTMLElement;
        element.removeAttribute('ref');
        return list;
      },
      defaultRefs,
    );

    return templateElement.content.firstElementChild;
  }
}
