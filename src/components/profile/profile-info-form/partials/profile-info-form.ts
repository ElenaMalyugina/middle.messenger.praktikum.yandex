import Form, { type FormProps } from "../../../../ui-units/form/form";
import TextRowEditable from "../../../../ui-units/row-blocks/text-row-editable/text-row-editable";
import ProfileInfoFormTemplate from "./profile-info-form.hbs?raw";

interface ProfileInfoFormProps extends Omit<FormProps, 'formRows'>{
    formRows: Element[];
}

const createFormRows = (): (Element | null)[]=> {
    return [
        new TextRowEditable({ label: "Почта", value: "pochta@yandex.ru", name: "email", type:"email"}).element(),
        new TextRowEditable({ label: "Логин", value: "ivanivanov", name: "login", type:"text"}).element(),
        new TextRowEditable({ label: "Имя", value: "Иван", name: "first_name", type:"text" }).element(),
        new TextRowEditable({ label: "Фамилия", value: "Иванов", name: "second_name", type:"text" }).element(),
        new TextRowEditable({ label: "Имя в чате", value: "Иван", name: "display_name", type:"text" }).element(),
        new TextRowEditable({ label: "Телефон", value: "+7 (909) 967 30 30", name: "phone", type:"text" }).element()
    ];
}

export default class ProfileInfoForm extends Form {
    static componentName = 'ProfileInfoForm';
    protected template = ProfileInfoFormTemplate;

    constructor(props:ProfileInfoFormProps){
        const completeProps = { ...props, formRows: createFormRows()};
        super(completeProps);
    }
}
