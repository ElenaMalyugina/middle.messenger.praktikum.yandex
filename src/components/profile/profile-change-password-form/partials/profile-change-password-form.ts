import Form, { type FormProps } from "../../../../ui-units/form/form";
import TextRowEditable from "../../../../ui-units/row-blocks/text-row-editable/text-row-editable";
import ProfileChangePasswordFormTemplate from "./profile-change-password-form.hbs?raw";

interface ProfileChangePasswordFormProps extends Omit<FormProps, 'formRows'>{
    formRows: Element[];
}

const createFormRows = (): (Element | null)[]=> {
    return [
        new TextRowEditable({ label: "Старый пароль", type:"password", name:"old_password"}).element(),
        new TextRowEditable({ label:"Новый пароль", type:"password",  name:"new_password"}).element(),
        new TextRowEditable({ label:"Старый пароль", type:"password",  name:"repeat-new-password"}).element(),

    ];
}

export default class ProfileChangePasswordForm extends Form {
    static componentName = 'ProfileChangePasswordForm';
    protected template = ProfileChangePasswordFormTemplate;

    constructor(props:ProfileChangePasswordFormProps){
        const completeProps = { ...props, formRows: createFormRows()};
        super(completeProps);
    }
}
