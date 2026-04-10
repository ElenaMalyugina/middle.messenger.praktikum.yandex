import "./datalist.css";
import Block, { type BlockOwnProps } from "../../framework/Block";
import DataListTemplate from "./datalist.hbs?raw";

export const notFoundText={
    start :"Начните что-то вводить",
    search: "Не найдено"
}

interface DataListProps extends BlockOwnProps{
    notFoundText: string;
    dataListActive: boolean;
    dataList: { value: number; text: string; }[];
    clickEmit: (e: HTMLElement)=>void;
}

export default class DataList extends Block<DataListProps>{
    static componentName = "DataList";
    protected template = DataListTemplate;

    constructor(e: DataListProps){
        super(e);

        this.props.notFoundText = notFoundText.start;
    }

    protected events = {
        click: (event: Event)=>{
            this.props.clickEmit(event.target as HTMLElement);
        }
    }

}
