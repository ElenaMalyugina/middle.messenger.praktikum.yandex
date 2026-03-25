import "/src/components/profile/profile-avatar/profile-avatar.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ProfileAvatarTemplate from "./profile-avatar.hbs?raw";

const initAllPropsMock:UserData={
    profileImg: `${import.meta.env.BASE_URL}img/avatar-profile.png`,
    profileName: "Иван"
}

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

    constructor(props:ProfileAvatarProps){
        super(props);
    }

    protected componentDidMount(): void {
         this.setProps({userData: {...initAllPropsMock}});
    }
}
