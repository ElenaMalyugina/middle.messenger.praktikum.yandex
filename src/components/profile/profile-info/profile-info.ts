import Block, { type BlockOwnProps } from "../../../framework/Block";
import type { UserInfo } from "../profile-info-form/form/profile-info-form";
import ProfileInfoBlockTemplate from "./profile-info.hbs?raw";

const demoUser:UserInfo = {
    email: "pochta@yandex.ru",
    login: "ivanivanov",
    first_name: "Иван",
    second_name: "Иванов",
    display_name: "Иван123",
    phone: "+7 909 967 30 30"
}

interface ProfileInfoBlockProps extends BlockOwnProps{
    data: UserInfo;
}

export default class ProfileInfoBlock extends Block<ProfileInfoBlockProps> {
    static componentName = 'ProfileInfoBlock';
    protected template = ProfileInfoBlockTemplate;

    protected componentDidMount(): void {
        this.setProps({
            data: {...demoUser}
        })
    }
}
