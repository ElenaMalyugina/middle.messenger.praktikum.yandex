import "./datalist.css";
import Block, { type BlockOwnProps } from "../../framework/Block";
import DataListTemplate from "./datalist.hbs?raw";

interface DataListProps extends BlockOwnProps{
    dataList: { value: number; text: string; }[];
    clickEmit: (e: HTMLElement)=>void;
}

export default class DataList extends Block<DataListProps>{
    static componentName = "DataList";
    protected template = DataListTemplate;

    protected events = {
        click: (event: Event)=>{
            this.props.clickEmit(event.target as HTMLElement);
        }
    }

}
