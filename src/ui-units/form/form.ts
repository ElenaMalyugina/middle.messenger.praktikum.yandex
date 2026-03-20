import Block, {type BlockOwnProps }  from "../../framework/Block";
import { tempSubmitHandler } from "../../services/formService";
import BaseValidationBlock from "../row-blocks/base-validation-block/base-validation-block";
import InputBlock from "../row-blocks/input-block/input-block";
import TextRowEditable from "../row-blocks/text-row-editable/text-row-editable";
import TextareaBlock from "../row-blocks/textarea-block/textarea-block";

export interface FormProps extends BlockOwnProps{
    id: string;
    className: string;
    action: string;
    method: string;
    ref: string;
    data: unknown;
    errorMessage: string | null; //если будут ошибки с бэка
}

export default abstract class Form <Props extends FormProps = FormProps> extends Block<Props>{

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();

            //Здесь хранится общий результат валидации формы
            const validationArr: boolean[] = [];

            //цикл по элемента формы
            this.children.forEach(el=>{
                if(this.isHasValidateElementBlock(el)){
                    // запускаем их собственную валидацию
                    const validationResult = el.onSubmitValidation();
                    validationArr.push(validationResult)
                }
            })

            //если хоть одна ошика на форме - выходим
            if(validationArr.some(value => !value)) return;

            //если ошибок нет, запусакем отправку формы
            tempSubmitHandler(this.refs);
        },
    };

    private isHasValidateElementBlock=(el: unknown)=>{
        return el instanceof BaseValidationBlock;
    }
}
