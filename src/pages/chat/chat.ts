import "./chat.css";
import "/src/components/chat/popup-contents/popup-contents.css";
import "/src/components/chat/modal-contents/modal-contents.css";
import Handlebars from "handlebars";
import {getDayYearString, getTimeString} from "../../utils/datetime.ts";
import { registerComponent } from './../../framework/RegisterComponent';
import chatTemplate from "./chat.hbs?raw";
import NoMessages from "../../components/chat/no-messages/no-messages.ts";
import Block, { type BlockOwnProps } from "../../framework/Block.ts";
import ChatSidebar from "../../components/chat/chat-sidebar/chat-sidebar.ts";
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
import AddDeleteUser, { type AddDeleteUserProps } from "../../components/chat/modal-contents/add-delete-user/add-delete-user.ts";
import AddDeleteUserForm from "../../components/chat/modal-contents/add-delete-user/form/add-delete-user-form.ts";
import PopupFilesForm from "../../components/chat/popup-contents/popup-files/form/popup-files-form.ts";
import PopupFiles from "../../components/chat/popup-contents/popup-files/popup-files.ts";

//Получение даты в читаемом формате
Handlebars.registerHelper("getDayAndYear", function(dateString){
    return getDayYearString(dateString);
})

//Получение даты в читаемом формате
Handlebars.registerHelper("getTime", function(dateString){
    return getTimeString(dateString);
})

ChatSidebar.register();
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

const toggleSidebarVisible = ()=>{
    const mobileBreakpoint = 700;
    if(window.innerWidth > mobileBreakpoint) return;
    document.addEventListener("click", function(e: Event){
        const sidebar = document.querySelector("#chat-sidebar");
        const target = e.target as HTMLElement;
        if(!sidebar || ! sidebar.contains(e.target as Node)) return;

        const classActive = "chat__sidebar--active";

        if(!target.classList.contains(classActive)){
            target.classList.add(classActive);
        }
        else{
            target.classList.remove(classActive);
        }
    })
}

toggleSidebarVisible();

interface ChatPageProps extends BlockOwnProps{
    selectedChatEmit?: (id:number)=>void;
}

export default class Chat extends Block<ChatPageProps>{
    static componentName = 'Chat';
    protected template = chatTemplate;

    //возможно, нужно что-то типа общего контекста, чтобы не прокидывать событие на 2 этажа вверх, пока пусть так
    setIsSelectedChat=(id:number)=>{
        console.log(id); // Потенциально можем запросить с бэка список сообщений в чате
        //чтобы не перерисовывались чаты, когда нужно перерисовать только блок с сообщениями
        const chatBody = this.children.find(item => item instanceof ChatBody);
        if(chatBody){
            chatBody.setProps({ isSelectedChat: true});
        }
    }

    constructor(props: ChatPageProps) {
        super(props);

        this.props.selectedChatEmit = this.setIsSelectedChat;

    }
}




