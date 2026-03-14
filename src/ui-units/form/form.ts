import Block, {type BlockOwnProps }  from "../../framework/Block";
import formTemplate from "./form.hbs?raw";

interface FormProps extends BlockOwnProps{
    id?: string;
    className: string;
    action?: string;
    method?: string;
    ref: string;
    blockChildren: Block[];
}

export default class Form extends Block<Partial<FormProps>>{
    static componentName = 'Form';
    protected template = formTemplate;
    public get publicRefs(){return this.refs || null};

    constructor(props: FormProps){
        super(props);

        // Получаем корневой элемент компонента
        const componentElement = document.querySelector("body");
        if(!componentElement){
            throw new Error("Не найден корневой элемент");
        }

        const formElement = this.element();
        if(!formElement){
            throw new Error("Не найден элемент формы");
        }

        this.props.blockChildren?.forEach((formEl) => {
            const childElement = formEl.element();
            if (childElement && formElement instanceof HTMLElement) {
                formElement.appendChild(childElement);
            }
        });

    }









}
