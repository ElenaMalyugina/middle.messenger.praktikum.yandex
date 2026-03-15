import "/src/components/profile/profile-avatar/profile-avatar.css";
import Block from "../../../framework/Block";
import ProfileAvatarTemplate from "./profile-avatar.hbs?raw";

export default class ProfileAvatar extends Block{
    static componentName = 'ProfileAvatar';
    protected template = ProfileAvatarTemplate;
}
