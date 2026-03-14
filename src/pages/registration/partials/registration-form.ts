import Form from "../../../ui-units/form/form";
import registrationFormTemplate from "./registration-form.hbs?raw";

export default class RegisstrationForm extends Form {
    static componentName = 'RegistrationForm';
    protected template = registrationFormTemplate;


}
