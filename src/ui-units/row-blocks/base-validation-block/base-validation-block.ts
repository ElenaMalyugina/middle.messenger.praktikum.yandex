import Block, { type BlockOwnProps } from "../../../framework/Block";
import { noError, validate, type formError } from "../../../services/validationService";
import ErrorMessage from "../../error-message/error-message";

export interface BaseValidationProps extends BlockOwnProps{
    validators: string;
    onValidate?: (val:unknown, validators: string[])=>void;
    cleanValidate?: ()=>void;
}

export default abstract class BaseValidationBlock<Props extends BaseValidationProps = BaseValidationProps> extends Block<Props>{

    onValidate=(val:unknown, validators: string[])=>{
        const error:formError = validate(val, validators);
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);

        if(errorMessageBlock){
            errorMessageBlock.setProps({message: error.text});
        }
    }

    cleanValidate=()=>{
        const error:formError = noError;
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);

        if(errorMessageBlock){
            errorMessageBlock.setProps({message: error.text});
        }
    }
}
