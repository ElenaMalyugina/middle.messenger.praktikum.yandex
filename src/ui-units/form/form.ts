import Block, {type BlockOwnProps }  from "../../framework/Block";
//import { tempSubmitHandler } from "../../services/formService";
import BaseValidationBlock from "../row-blocks/base-validation-block/base-validation-block";

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

            //если хоть одна ошибка на форме - выходим
            if(validationArr.some(value => !value)) return;

            //если ошибок нет, запусакем отправку формы
            this.formDataBuilder(this.refs);
        },
    };

    protected abstract submitFormHandler (data: unknown): void;

    formDataBuilder = (refs:Record<string, Element>) => {
        const keys = Object.keys(refs);

        keys.forEach(el=>{
            if(refs[el] instanceof HTMLFormElement){
                const formData = new FormData(refs[el]);
                const data = Object.fromEntries(formData);
                this.submitFormHandler(data);
                //console.log(data);
            }
        })
    }



    private isHasValidateElementBlock=(el: unknown)=>{
        return el instanceof BaseValidationBlock;
    }
}
