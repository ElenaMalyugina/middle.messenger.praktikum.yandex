import "./input-block.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import inputBlockTemplate from "./input-block.hbs?raw";
import { initialError, validateRequired, type formError } from "../../../services/validationService";

interface InputBlockProps extends Partial<BlockOwnProps>{
    block: string;
    type: string;
    label: string;
    name: string;
    errorMessage: string | null;
    onValidate: (val:unknown)=>void;
    cleanValidate: ()=>void;
    floatLabel: (el:HTMLInputElement)=>void;
}

export default class InputBlock extends Block<Partial<InputBlockProps>>{
    static componentName = 'InputBlock';
    protected template = inputBlockTemplate;

    constructor(props:InputBlockProps){
        super(props);
        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate,
            floatLabel: this.floatLabel
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


    onValidate=(val:unknown)=>{
        //потом доделать валидацию
        const error:formError = validateRequired(val);
        this.setProps({errorMessage: error.text});
    }

    cleanValidate=()=>{
        const error:formError = initialError;
        this.setProps({errorMessage: error.text});
    }

}
