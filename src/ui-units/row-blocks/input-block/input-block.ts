import "./input-block.css";
import inputBlockTemplate from "./input-block.hbs?raw";
import BaseValidationBlock, { type BaseValidationProps } from "../base-validation-block/base-validation-block";

interface InputBlockProps extends BaseValidationProps{
    id:string;
    block: string;
    type: string;
    label: string;
    name: string;
    value: string;
    onInput: (el:HTMLInputElement)=>void;
    onFocus: (el:HTMLInputElement)=>void;
    onBlur: (el:HTMLInputElement)=>void;
    onInputEmit?: (el:HTMLInputElement)=>void;
    onFocusEmit?: (el:HTMLInputElement)=>void;
    onBlurEmit?: (el:HTMLInputElement)=>void;
}

export default class InputBlock extends BaseValidationBlock<InputBlockProps>{
    static componentName = 'InputBlock';
    protected template = inputBlockTemplate;

    constructor(props:InputBlockProps){
        super(props);

        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate,
            onInput: this.onInput,
            onFocus: this.onFocus,
            onBlur: this.onBlur
        });
    }

    onInput=(el: HTMLInputElement)=>{
        this.floatLabel(el);

        if(this.props.onInputEmit){
            this.props.onInputEmit(el);
        }
    }

    onFocus=(el: HTMLInputElement)=>{
        if(this.props.onFocusEmit){
            this.props.onFocusEmit(el);
        }

    }

    onBlur=(el: HTMLInputElement)=>{
        if(this.props.onBlurEmit){
            this.props.onBlurEmit(el);
        }
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
