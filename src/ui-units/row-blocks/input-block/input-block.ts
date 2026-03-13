import "./input-block.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import inputBlockTemplate from "./input-block.hbs?raw";

interface InputBlockProps extends Partial<BlockOwnProps>{
    block: string;
    type: string;
    label: string;
    name: string;
}

export default class InputBlock extends Block<Partial<InputBlockProps>>{
    static componentName = 'InputBlock';
    protected template = inputBlockTemplate;

    protected events = {
        input: () => {
            const keys = Object.keys(this.refs);
            const notEmptyInputClass = "input-block--input-not-empty";
            const container = this.refs["container"];
            if(!container) return;

            keys.forEach(el=>{
                if(this.refs[el] instanceof HTMLInputElement){
                    if ((this.refs[el]).value.trim() !== '') {
                        container.classList.add(notEmptyInputClass);
                    } else {
                        container.classList.remove(notEmptyInputClass);
                    }
                }
            })
        },
    };

}
