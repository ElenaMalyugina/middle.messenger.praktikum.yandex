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

    constructor(props: ProfileInfoBlockProps){
        super(props);

        Store.subscribe(()=>{
            this.updateData();
        })
    }

    protected updateData = ()=>{
        const userData = Store.getState().userData;
        if(!userData) return;
        this.setProps({data: userData as UserInfo})
    }
}
