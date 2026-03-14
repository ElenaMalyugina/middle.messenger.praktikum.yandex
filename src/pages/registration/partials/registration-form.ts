import Form from "../../../ui-units/form/form";
import registrationFormTemplate from "./registration-form.hbs?raw";

export default class RegistrationForm extends Form {
    static componentName = 'RegistrationForm';
    protected template = registrationFormTemplate;


}
