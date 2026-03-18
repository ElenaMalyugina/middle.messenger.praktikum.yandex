import "./input-block.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import inputBlockTemplate from "./input-block.hbs?raw";
import { noError, validate, type formError } from "../../../services/validationService";

interface InputBlockProps extends BlockOwnProps{
    block: string;
    type: string;
    label: string;
    name: string;
    errorMessage: string | null;
    validators: string[];
    onValidate: (val:unknown, validators: string[])=>void;
    cleanValidate: ()=>void;
    onInput: (el:HTMLInputElement)=>void;
}

export default class InputBlock extends Block<InputBlockProps>{
    static componentName = 'InputBlock';
    protected template = inputBlockTemplate;

    constructor(props:InputBlockProps){
        super(props);

        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate,
            onInput: this.floatLabel
        });
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

    onValidate=(val:unknown, validators: string[])=>{
        const error:formError = validate(val, validators);
        this.children[2].setProps({message: error.text});
    }

    cleanValidate=()=>{
        const error:formError = noError;
        this.children[2].setProps({message: error.text});
    }

}
