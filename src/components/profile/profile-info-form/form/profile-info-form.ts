import Form, { type FormProps } from "../../../../ui-units/form/form";
import ProfileInfoFormTemplate from "./profile-info-form.hbs?raw";

const demoUser:UserInfo={
    email: "pochta@yandex.ru",
    login: "ivanivanov",
    first_name: "Иван",
    second_name: "Иванов",
    display_name: "Иван123",
    phone: "+7 909 967 30 30"
}

export interface UserInfo{
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

interface ProfileInfoFormProps extends FormProps{
    data: UserInfo;
}

export default class ProfileInfoForm extends Form<ProfileInfoFormProps> {
    static componentName = 'ProfileInfoForm';
    protected template = ProfileInfoFormTemplate;

    protected componentDidMount(): void {
        this.setProps({
            data: demoUser
        })
    }

}
