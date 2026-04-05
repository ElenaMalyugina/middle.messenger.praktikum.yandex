import Block, { type BlockOwnProps } from "../../../framework/Block";
import Store from "../../../framework/store/Store";
import { type UserInfo } from "../../../types/userInfo";
import ProfileInfoBlockTemplate from "./profile-info.hbs?raw";

interface ProfileInfoBlockProps extends BlockOwnProps{
    data: UserInfo;
}

export default class ProfileInfoBlock extends Block<ProfileInfoBlockProps> {
    static componentName = 'ProfileInfoBlock';
    protected template = ProfileInfoBlockTemplate;

    protected componentDidMount(): void {
        Store.subscribe(()=>{
            const userData = Store.getState();
            this.setProps({data: userData.userData as UserInfo})
        })

    }
}
