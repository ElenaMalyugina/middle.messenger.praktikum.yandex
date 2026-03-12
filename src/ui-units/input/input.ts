import Block, {type BlockOwnProps }  from "../../framework/Block";
import InputTemplate from "./input.hbs?raw";

interface InputProps extends BlockOwnProps {
    id: string;
    name: string;
    className: string;
    type: string; //enum
    placeholder: string;
    value: string;
    required: boolean;
    ref: string;
}

export default class Input extends Block<Partial<InputProps>>{
    static componentName = "Input";
    protected template = InputTemplate;

}
