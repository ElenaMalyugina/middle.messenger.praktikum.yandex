import Block, {type BlockOwnProps }  from "../../framework/Block";
import textareaTemplate from "./textarea.hbs?raw";

interface TextareaProps extends BlockOwnProps {
    id: string;
    name: string;
    className: string;
    rows: number;
    placeholder: string;
    value: string;
    required: boolean;
    ref: string;
}

export default class Textarea extends Block<Partial<TextareaProps>>{
    static componentName = "Textarea";
    protected template = textareaTemplate;

}
