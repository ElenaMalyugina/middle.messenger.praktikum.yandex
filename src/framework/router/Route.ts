import type { BlockOwnProps } from '../Block';
import  Block from '../Block';

export type RouteMode = "clean" | null;

export interface RouteProps{
    rootQuery: string;
    mode: RouteMode;
    guards: string[];
    params?: Record<string, number>;
}

export default class Route {
    private _pathname: string; //путь
    private _blockClass:  { new(props: BlockOwnProps | undefined): Block }; //конструктор блока
    private _block: Block | null; // конкретный блок, построенный из _blockClass
    public _blockProps: Partial<BlockOwnProps>; //пропсы, с которыми надо вызвать блок
    private  _props: RouteProps; //пропсы routera
    public get guards(){
        return this._props.guards;
    }

    constructor(pathname: string, view: {new(props?: BlockOwnProps): Block}, blockProps: Partial<BlockOwnProps>, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this._blockProps = blockProps;
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
    public match(pathname: string): { matched: boolean; params: Record<string, string> } {
        const routeParts = this._pathname.split('/');
        const pathParts = pathname.split('/');

        // Сначала проверяем, что количество сегментов совпадает
        if (routeParts.length !== pathParts.length) {
            return { matched: false, params: {} };
        }

        const params: Record<string, string> = {};

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                // Это параметр — сохраняем его значение
                const paramName = routeParts[i].substring(1); // убираем двоеточие
                params[paramName] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
                // Сегменты не совпадают и это не параметр
                return { matched: false, params: {} };
            }
        }

        return { matched: true, params };
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
