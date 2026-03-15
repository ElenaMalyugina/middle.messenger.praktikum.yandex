import Block, { type BlockOwnProps } from "../../framework/Block";
import TableTemplate from "./table.hbs?raw";

interface TableProps extends BlockOwnProps{
    rows: HTMLElement[];
}

export default class Table extends Block<Partial<TableProps>>{
    static componentName = 'Table';
    protected template = TableTemplate;

    protected rows = [];

    constructor(props:TableProps){
        super(props);
    }

    /*в текущей реализации базового Block, если внутри таблицы - компоненты-наследники Block,
     таблицы строим вручную, т.к. плейсхолдер <div data-atribute=...></div> ставится вне таблицы*/
    protected componentDidMount(): void {
        const form = this.refs["tbody"];

        this.props.rows?.forEach(el=>{
            form.appendChild(el);
        })
    }
}
