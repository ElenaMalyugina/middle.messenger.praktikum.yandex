import type { BlockOwnProps } from '../Block';
import  Block from '../Block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
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
    public navigate(pathname: string):void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.createBlock();
        }
    }

    //Если уходим с маршрута, очищаем содержимое
    public leave():void {
        if (this._block) {
            this._block.hide();
            this._block = null;
        }
    }


    //совпадают ли маршруты
    public match(pathname: string): boolean {
        if (this._pathname === '*') {
            return true; // Маршрут 404 совпадает с любым путём
        }

        return isEqual(pathname, this._pathname);
    }

    //рендер содержимого в зависимости от маршрута
    public createBlock():void {
        //всегда создаем заново
        this._block = new this._blockClass(this._blockProps as Partial<BlockOwnProps>);

        if(!this._block) return;
        this.renderDom(this._props.rootQuery, this._block);
    }

    private renderDom(rootSelector: string, block: Block):void {
        const root = document.querySelector(rootSelector);
        if(!root || !block ) return;

        const node = block.element();
        if(!node) return;

        root.appendChild(node);
    }

}
