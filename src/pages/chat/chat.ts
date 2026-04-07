import "./chat.css";
import "../../components/chat/chat-sidebar/chat-sidebar.css";
import Handlebars from "handlebars";
import {getDayYearString, getTimeString} from "../../utils/datetime.ts";
import { registerComponent } from './../../framework/RegisterComponent';
import chatTemplate from "./chat.hbs?raw";
import NoMessages from "../../components/chat/no-messages/no-messages.ts";
import Block, { type BlockOwnProps } from "../../framework/Block.ts";
import ChatsList from "../../components/chat/chats-list/chats-list.ts";
import ChatItem from "../../components/chat/chat-item/chat-item.ts";
import ChatAvatar from "../../components/chat/chat-avatar/chat-avatar.ts";
import MessageItem from "../../components/chat/message-item/message-item.ts";
import MessagesList from "../../components/chat/messages-list/messages-list.ts";
import MessagesBox from "../../components/chat/messages-box/messages-box.ts";
import ChatHeader from "../../components/chat/chat-header/chat-header.ts";
import ChatSearch from "../../components/chat/chat-search/chat-search.ts";
import MessagesBoxHeader from "../../components/chat/messages-box-header/messages-box-header.ts";
import MessageSend from "../../components/chat/message-send/message-send.ts";
import MessagesSendForm from "../../components/chat/message-send/form/messages-send-form.ts";
import ChatSearchForm from "../../components/chat/chat-search/form/chat-search-form.ts";
import PopupUser from "../../components/chat/popup-contents/popup-user/popup-user.ts";
import ChatBody from "../../components/chat/chat-body/chat-body.ts";
import AddDeleteUser from "../../components/chat/modal-contents/add-delete-user/add-delete-user.ts";
import AddDeleteUserForm from "../../components/chat/modal-contents/add-delete-user/form/add-delete-user-form.ts";
import PopupFilesForm from "../../components/chat/popup-contents/popup-files/form/popup-files-form.ts";
import PopupFiles from "../../components/chat/popup-contents/popup-files/popup-files.ts";
import AddChat from "../../components/chat/modal-contents/add-chat/add-chat.ts";
import AddChatForm from "../../components/chat/modal-contents/add-chat/form/add-chat-form.ts";
import MessageBoxAvatarForm from "../../components/chat/messageBoxAvatarForm/message-box-avatar-form.ts";

//Получение даты в читаемом формате
Handlebars.registerHelper("getDayAndYear", function(dateString){
    return getDayYearString(dateString);
})

//Получение даты в читаемом формате
Handlebars.registerHelper("getTime", function(dateString){
    return getTimeString(dateString);
})

registerComponent(ChatsList);
registerComponent(ChatItem);
registerComponent(ChatAvatar);
registerComponent(ChatHeader);
registerComponent(ChatSearch);
registerComponent(ChatSearchForm);
registerComponent(ChatBody);
registerComponent(NoMessages);
registerComponent(MessagesBox);
registerComponent(MessagesBoxHeader);
registerComponent(MessagesList);
registerComponent(MessageItem);
registerComponent(MessageSend);
registerComponent(MessagesSendForm);
registerComponent(PopupFiles);
registerComponent(PopupFilesForm);
registerComponent(PopupUser);
registerComponent(AddDeleteUser);
registerComponent(AddDeleteUserForm);
registerComponent(AddChat);
registerComponent(AddChatForm);
registerComponent(MessageBoxAvatarForm);


interface ChatPageProps extends BlockOwnProps{
    sidebarActive?: boolean;
}

export default class Chat extends Block<ChatPageProps>{
    static componentName = 'Chat';
    protected template = chatTemplate;
    private activeSidebarClass = "chat__sidebar--active";

    protected events={
        click: (event: Event) => {
            const target= event.target;
            const sidebar = this.refs["sidebar"];

            if(sidebar.classList.contains(this.activeSidebarClass)){
                this.hideSidebar(sidebar);
            }
            else{
                if(!sidebar || sidebar!=target) return;
                this.showSidebar(sidebar);
            }
        }
    }

    showSidebar = (sidebar:Element)=>{
        const mobileBreakpoint = 700;
        if(window.innerWidth > mobileBreakpoint) return;

        sidebar.classList.add(this.activeSidebarClass);
    }

    hideSidebar = (sidebar:Element)=>{
        const mobileBreakpoint = 700;
        if(window.innerWidth > mobileBreakpoint) return;

        sidebar.classList.remove(this.activeSidebarClass);
    }
}
