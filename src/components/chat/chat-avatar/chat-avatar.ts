import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatAvatarTemplate from "./chat-avatar.hbs?raw";

interface ChatAvatarBlockProps extends BlockOwnProps{
    addClass: string;
    avatarUrl: string;
}

export default class ChatAvatar extends Block<ChatAvatarBlockProps>{
    static componentName = 'ChatAvatar';
    protected template = ChatAvatarTemplate;
}
