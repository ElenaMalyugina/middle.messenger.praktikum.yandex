import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatAvatarTemplate from "./chat-avatar.hbs?raw";

interface UserAvatar{
    avatarUrl:string;
}

interface ChatAvatarSettings extends BlockOwnProps{
    addClass: string;
}

type ChatAvatarCombinedProps= UserAvatar & ChatAvatarSettings;

export default class ChatAvatar extends Block<Partial<ChatAvatarCombinedProps>>{
    static componentName = 'ChatAvatar';
    protected template = ChatAvatarTemplate;
}
