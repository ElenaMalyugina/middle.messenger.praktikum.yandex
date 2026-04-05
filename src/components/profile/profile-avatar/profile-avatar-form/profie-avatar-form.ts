import "/src/components/profile/profile-avatar/profile-avatar.css";
import Block, { type BlockOwnProps } from "../../../../framework/Block";
import ProfileAvatarFormTemplate from "./profile-avatar-form.hbs?raw";


export default class ProfileAvatarForm extends Block<BlockOwnProps>{
    static componentName = 'ProfileAvatarForm';
    protected template = ProfileAvatarFormTemplate;

    protected componentDidMount(): void {

    }

}
