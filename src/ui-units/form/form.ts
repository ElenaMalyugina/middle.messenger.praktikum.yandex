//import BaseFormController from "../../controllers/baseFormController";
import Block, {type BlockOwnProps }  from "../../framework/Block";
//import { tempSubmitHandler } from "../../services/formService";
//import BaseValidationBlock from "../row-blocks/base-validation-block/base-validation-block";

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
    protected abstract submitForm: (form: Form)=>void

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();

            this.submitForm(this)

            //если не прошли валидацию, выходим
            /*if(!this.formValidation()) return;

            //если ошибок нет, запусакем отправку формы
            const data = this.formDataBuilder(this.refs);

            this.submitFormHandler(data);*/
        }
    }



   // protected abstract submitFormHandler (form: Form): void;


    /*protected formValidation=()=>{
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
        if(validationArr.some(value => !value)) return false;

        return true;
    }*/


    /*protected formDataBuilder = (refs:Record<string, Element>) => {
        const keys = Object.keys(refs);
        let data;

        keys.forEach(el=>{
            if(refs[el] instanceof HTMLFormElement){
                const formData = new FormData(refs[el]);
                data = Object.fromEntries(formData);
            }
        })

        return data;
    }*/



    /*private isHasValidateElementBlock=(el: unknown)=>{
        return el instanceof BaseValidationBlock;
    }*/
}
