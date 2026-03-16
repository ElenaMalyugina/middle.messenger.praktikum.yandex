import "/src/components/profile/profile-avatar/profile-avatar.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ProfileAvatarTemplate from "./profile-avatar.hbs?raw";

interface ProfileAvatarProps extends Partial<BlockOwnProps>{
    isEditable: boolean;
    currentForm?: string;
}

interface UserData{
    profileImg: string;
    profileName: string;
}

type ProfileAvatarCombinedProps = ProfileAvatarProps & UserData;

export default class ProfileAvatar extends Block<Partial<ProfileAvatarCombinedProps>>{
    static componentName = 'ProfileAvatar';
    protected template = ProfileAvatarTemplate;

    initiAllPropsMock: UserData={
        profileImg: "/img/avatar-profile.png",
        profileName: "Иван"
    }

    constructor(props:ProfileAvatarProps){
        super(props);
        this.setProps({...this.initiAllPropsMock});
    }
}
