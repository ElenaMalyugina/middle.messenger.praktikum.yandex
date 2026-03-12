import Block, {type BlockOwnProps }  from "../../framework/Block";
import labelTemplate from "./label.hbs?raw";

interface LabelProps extends BlockOwnProps{
    className: string;
    forEl: string;
    text: string;
}

export default class Label extends Block<Partial<LabelProps>>{
    static componentName = 'Label';
    protected template = labelTemplate;
}
