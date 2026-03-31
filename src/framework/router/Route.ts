import type { BlockOwnProps } from '../Block';
import  Block from '../Block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(rootSelector: string, block: Block) {
    const root = document.querySelector(rootSelector);
    if(!root || !block ) return;

    const node = block.element();
    if(!node) return;

    root.appendChild(node);

    return root;
}

interface RouteProps{
    rootQuery: string;
}

export default class Route {
    private _pathname: string; //путь
    private _blockClass:  { new(props: BlockOwnProps): Block }; //конструктор блока
    private _block: Block | null; // конкретный блок, построенный из _blockClass
    private _blockProps: unknown; //пропсы, с которыми надо вызвать блок
    private _props: RouteProps; //пропсы routera


    constructor(pathname: string, view:  { new(): Block }, props: RouteProps, blockProps: unknown) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this._blockProps = blockProps;
    }

    //отправить по роуту
    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    //Если уходим с маршрута, очищаем содержимое
    leave() {
        if (this._block) {
            this._block.hide(); //как именно хайд, додумать
        }
    }


    //совпадают ли маршруты
    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    //рендер содержимого в зависимости от маршрута
    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._blockProps as Partial<BlockOwnProps>);

            if(!this._block) return;

            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show(); //как показывать - тоже дописать
    }
}
