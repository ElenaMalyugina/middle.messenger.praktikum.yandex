import "/src/components/profile/profile-avatar/profile-avatar.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ProfileAvatarTemplate from "./profile-avatar.hbs?raw";

interface UserData{
    profileImg: string;
    profileName: string;
}

interface ProfileAvatarProps extends BlockOwnProps{
    isEditable: boolean;
    currentForm?: string;
    userData: UserData;
}

export default class ProfileAvatar extends Block<ProfileAvatarProps>{
    static componentName = 'ProfileAvatar';
    protected template = ProfileAvatarTemplate;

    initAllPropsMock: UserData={
        profileImg: "/img/avatar-profile.png",
        profileName: "Иван"
    }

    constructor(props:ProfileAvatarProps){
        super(props);
        this.setProps({userData: {...this.initAllPropsMock}});
    }
}
