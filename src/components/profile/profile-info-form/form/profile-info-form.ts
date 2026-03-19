import Form, { type FormProps } from "../../../../ui-units/form/form";
import ProfileInfoFormTemplate from "./profile-info-form.hbs?raw";

export default class ProfileInfoForm extends Form<FormProps> {
    static componentName = 'ProfileInfoForm';
    protected template = ProfileInfoFormTemplate;

}
