import Block, {type BlockOwnProps }  from "../../framework/Block";
import ButtonTemplate from "./button.hbs?raw";

interface ButtonProps extends BlockOwnProps {
    id: string;
    className: string;
    type: string; //enum
    text: string;
    ref: string;
}

export default class Button extends Block<Partial<ButtonProps>>{
    static componentName = "Button";
    protected template = ButtonTemplate;

}
