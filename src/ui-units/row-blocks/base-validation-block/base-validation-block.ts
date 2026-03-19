import Block, { type BlockOwnProps } from "../../../framework/Block";
import { noError, validate, type formError } from "../../../services/validationService";
import ErrorMessage from "../../error-message/error-message";

export interface BaseValidationProps extends BlockOwnProps{
    validators: string;
    onValidate?: (val:unknown, validators: string[])=>boolean;
    cleanValidate?: ()=>void;
}

export default abstract class BaseValidationBlock<Props extends BaseValidationProps = BaseValidationProps> extends Block<Props>{

    onValidate=(val:unknown, validators: string[])=>{
        const error:formError = validate(val, validators);
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);

        if(errorMessageBlock){
            errorMessageBlock.setProps({message: error.text});
        }

        return error.isValid;
    }

    cleanValidate=()=>{
        const error:formError = noError;
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);

        if(errorMessageBlock){
            errorMessageBlock.setProps({message: error.text});
        }
    }

    onSubmitValidation=()=>{
        const keys = Object.keys(this.refs);
        let result = false;

        keys.forEach(el=>{
            if(this.isFormElement(this.refs[el])){
                const value= this.refs[el].value;
                const validators= this.refs[el].getAttribute("data-validators")?.split(",");
                if(!validators) return true;
                result = this.onValidate(value, validators);
            }
        })

        return result;
    }

    private isFormElement(el: unknown): el is HTMLInputElement | HTMLTextAreaElement {
        return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
    }
}
