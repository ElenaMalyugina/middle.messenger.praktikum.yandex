import Block, {type BlockOwnProps }  from "../../framework/Block";
import Store from "../../framework/store/Store";

export interface FormProps extends BlockOwnProps{
    id: string;
    className: string;
    action: string;
    method: string;
    ref: string;
    data: unknown;
}

export default abstract class Form <Props extends FormProps = FormProps> extends Block<Props>{
    protected abstract submitForm: (form: Form)=>void

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            this.submitForm(this);
        },
        click: (event: Event)=>{
            if(event.target instanceof HTMLInputElement){
                if(Store){
                    const store= Store.getState();
                    if(store.serverError.length){
                        Store.setState("serverError", "");
                    }
                }
            }
        }
    }

}
