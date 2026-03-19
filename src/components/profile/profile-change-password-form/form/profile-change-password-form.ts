import Form, { type FormProps } from "../../../../ui-units/form/form";
import ProfileChangePasswordFormTemplate from "./profile-change-password-form.hbs?raw";

export default class ProfileChangePasswordForm extends Form<FormProps> {
    static componentName = 'ProfileChangePasswordForm';
    protected template = ProfileChangePasswordFormTemplate;


}
