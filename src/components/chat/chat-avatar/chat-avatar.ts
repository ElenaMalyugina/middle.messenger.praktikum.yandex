import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatAvatarTemplate from "./chat-avatar.hbs?raw";

const avatarMock={
    avatarUrl: "avatar.png"
}

interface UserAvatar{
    avatarUrl:string;
}

interface ChatAvatarBlock extends BlockOwnProps{
    addClass: string;
    avatar: UserAvatar;
}

export default class ChatAvatar extends Block<ChatAvatarBlock>{
    static componentName = 'ChatAvatar';
    protected template = ChatAvatarTemplate;

    protected componentDidMount(): void {
        this.setProps({
            avatar: {...avatarMock}
        })
    }
}
