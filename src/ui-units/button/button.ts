import Block, {type BlockOwnProps }  from "../../framework/Block";
import ButtonTemplate from "./button.hbs?raw";

type buttonTypes = "submit" | "button";

interface ButtonProps extends BlockOwnProps {
    id: string;
    className: string;
    type: buttonTypes;
    text: string;
    ref: string;
    onClick?: (event: Event, val?:unknown)=>unknown
}

export default class Button extends Block<ButtonProps>{
    static componentName = "Button";
    protected template = ButtonTemplate;

    protected events = {
        click: (event: Event) => {
            const keys = Object.keys(this.refs);
            const button = this.refs[keys[0]];
            if(this.props.onClick){
                this.props.onClick(event, button);
            }
        }
    }

}
