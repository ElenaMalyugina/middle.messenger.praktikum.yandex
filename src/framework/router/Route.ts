import type { BlockOwnProps } from '../Block';
import  Block from '../Block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export type RouteMode = "clean" | null;

export interface RouteProps{
    rootQuery: string;
    mode: RouteMode;
    guards: string[];
}

export default class Route {
    private _pathname: string; //путь
    private _blockClass:  { new(props: BlockOwnProps): Block }; //конструктор блока
    private _block: Block | null; // конкретный блок, построенный из _blockClass
    private _blockProps: Partial<BlockOwnProps>; //пропсы, с которыми надо вызвать блок
    private  _props: RouteProps; //пропсы routera
    public get guards(){
        return this._props.guards;
    }

    constructor(pathname: string, view: {new(): Block}, blockProps: Partial<BlockOwnProps>, props: RouteProps) {
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
            this._block.hide(this._props.mode);

            //если в истории не нужны предыдущие состояния
            if(this._props.mode == "clean"){
                this._block = null;
                this._blockProps.__children = [];
                this._blockProps.__refs = {};
            }
        }
    }


    //совпадают ли маршруты
    public match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    //рендер содержимого в зависимости от маршрута
    public createBlock():void {
        if(!this._block){
            this._block = new this._blockClass(this._blockProps as Partial<BlockOwnProps>);
            if(!this._block) return;
        }

        this._block.renderDom(this._props.rootQuery);
    }
}
