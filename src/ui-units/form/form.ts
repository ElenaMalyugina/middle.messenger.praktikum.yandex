import Block, {type BlockOwnProps }  from "../../framework/Block";
import { tempSubmitHandler } from "../../services/formService";
import InputBlock from "../row-blocks/input-block/input-block";
import TextRowEditable from "../row-blocks/text-row-editable/text-row-editable";
import TextareaBlock from "../row-blocks/textarea-block/textarea-block";

export interface FormProps extends BlockOwnProps{
    id: string;
    className?: string;
    action: string;
    method: string;
    ref?: string;
    errorMessage?: string | null;
}

export default abstract class Form <Props extends FormProps = FormProps> extends Block<Props>{

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            const validationArr: boolean[] = [];
            this.children.forEach(el=>{
                if(this.isFormElementBlock(el)){
                    const validationResult = el.onSubmitValidation();
                    validationArr.push(validationResult)
                }
            })

            if(validationArr.some(value => !value)) return;

            tempSubmitHandler(this.refs);
        },
    };

    private isFormElementBlock(el: unknown): el is InputBlock | TextRowEditable | TextareaBlock {
        return el instanceof InputBlock || el instanceof TextRowEditable || el instanceof TextareaBlock;
    }
}
