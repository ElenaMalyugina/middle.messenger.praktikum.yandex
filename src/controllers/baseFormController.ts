import type Block from "../framework/Block";
import type Form from "../ui-units/form/form";
import BaseValidationBlock from "../ui-units/row-blocks/base-validation-block/base-validation-block";

export default abstract class BaseFormController<T>{

    public submitFormHandler = (form: Form)=>{
        const isValidForm = this.formValidation(form.publicChildren);

        if(!isValidForm) return;

        const formData = this.formDataBuilder(form.publicRefs) || null;

        this.formSend(formData);
    };

    protected abstract formSend: (data: T | null)=> Promise<unknown>

    protected formValidation=(blocks: Block[])=>{
        //Здесь хранится общий результат валидации формы
        const validationArr: boolean[] = [];

        //цикл по элемента формы
        blocks.forEach(el=>{
            if(this.isHasValidateElementBlock(el)){
                // запускаем их собственную валидацию
                const validationResult = el.onSubmitValidation();
                validationArr.push(validationResult)
            }
        })

        //если хоть одна ошибка на форме - выходим
        if(validationArr.some(value => !value)) return false;

        return true;
    }

    protected formDataBuilder = (refs:Record<string, Element>) => {
        const keys = Object.keys(refs);
        let data;

        keys.forEach(el=>{
            if(refs[el] instanceof HTMLFormElement){
                const formData = new FormData(refs[el]);
                console.log(formData.getAll("avatar"))
                data = Object.fromEntries(formData);
            }
        })

        return data;
    }

    private isHasValidateElementBlock=(el: unknown)=>{
        return el instanceof BaseValidationBlock;
    }
}
