import Block, {type BlockOwnProps }  from "../../framework/Block";
import ButtonTemplate from "./button.hbs?raw";

type buttonTypes = "submit" | "button";

interface ButtonProps extends BlockOwnProps {
    id: string;
    className: string;
    type: buttonTypes;
    text: string;
    ref: string;
}

export default class Button extends Block<ButtonProps>{
    static componentName = "Button";
    protected template = ButtonTemplate;

}
