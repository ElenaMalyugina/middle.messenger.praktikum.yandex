import "./input-block.css";
import inputBlockTemplate from "./input-block.hbs?raw";
import BaseValidationBlock, { type BaseValidationProps } from "../base-validation-block/base-validation-block";

interface InputBlockProps extends BaseValidationProps{
    id:string;
    block: string;
    type: string;
    label: string;
    name: string;
    value?: string;
    onInput: (el:HTMLInputElement)=>void;
    onInputEmit: (el:HTMLInputElement)=>void;
}

export default class InputBlock extends BaseValidationBlock<InputBlockProps>{
    static componentName = 'InputBlock';
    protected template = inputBlockTemplate;

    constructor(props:InputBlockProps){
        super(props);

        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate,
            onInput: this.onInput
        });
    }

    onInput=(el: HTMLInputElement)=>{
        this.floatLabel(el)
        this.props.onInputEmit(el)

    }

    floatLabel=(el: HTMLInputElement)=>{
        const notEmptyInputClass = "input-block--input-not-empty";
        const container = this.refs["container"];
        if(!container) return;

        if ((el).value.trim() !== '') {
            container.classList.add(notEmptyInputClass);
        } else {
            container.classList.remove(notEmptyInputClass);
        }
    }
}
