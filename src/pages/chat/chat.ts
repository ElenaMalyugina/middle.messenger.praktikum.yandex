import "./chat.css";
import "/src/components/chat/popup-contents/popup-contents.css";
import "/src/components/chat/modal-contents/modal-contents.css";
import Handlebars from "handlebars";
import {getDayYearString, getTimeString} from "../../utils/datetime.ts";
import addUser from "/src/components/chat/modal-contents/add-delete-user/add-delete-user.hbs?raw";
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
import PopupFilesForm from "../../components/chat/popup-contents/popup-files/popup-files-form.ts";
import PopupUser from "../../components/chat/popup-contents/popup-user/popup-user.ts";
import ChatBody from "../../components/chat/chat-body/chat-body.ts";

ChatSidebar.register();
Handlebars.registerPartial("add-user-content", addUser);

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
registerComponent(PopupFilesForm);
registerComponent(PopupUser);

//склейка урла
Handlebars.registerHelper('concat', function() {
  return Array.prototype.slice.call(arguments, 0, -1).join('');
});

//Получение даты в читаемом формате
Handlebars.registerHelper("getDayAndYear", function(dateString){
    return getDayYearString(dateString);
})

//Получение даты в читаемом формате
Handlebars.registerHelper("getTime", function(dateString){
    return getTimeString(dateString);
})

const toggleSidebarVisible = ()=>{
    const mobileBreakpoint = 700;
    document.addEventListener("click", function(e: Event){
        if(window.innerWidth > mobileBreakpoint) return;

        const sidebar = document.querySelector("#chat-sidebar");
        const target = e.target as HTMLElement;

        if(!sidebar || ! sidebar.contains(e.target as Node)) return;

        const classActive = "chat__sidebar--active";

        target.addEventListener("click", ()=>{
            if(!target.classList.contains(classActive)){
                target.classList.add(classActive);
            }
        })
    })
}

//закрытие попапов
const popupClose = (popup:HTMLDialogElement, button:Element, activeClass:string )=>{
    const popupCloseHandler = function(e: Event){
        if (!popup.contains(e.target as Node) && popup.open) {
            popup.close();
            button.classList.remove(activeClass);
            document.removeEventListener("click", popupCloseHandler);
        }
    }
    //гарантия, что не будет доп. экземпляров
    document.removeEventListener("click", popupCloseHandler);
    document.addEventListener("click", popupCloseHandler)
}

//открытие попапов
const dialogShow = (selectorButton: string, selectorPopup: string, activeClass: string)=>{
    document.addEventListener("click", function(e: Event){
        const button = document.querySelector(selectorButton);
        if(!button || !button.contains(e.target as Node)) return;

        const popup = document.querySelector<HTMLDialogElement>(selectorPopup);
        if(!popup) return;

        if(!popup.open){
            popup.show();
            popupClose(popup, button, activeClass);
            button.classList.add(activeClass);
        }
        else{
            button.classList.remove(activeClass);
        }
    })
}

//настройки для модалок
const modalAddUser = {
    title: "Добавить пользователя",
    action: "/chat",
    buttonText: "Добавить"
}
const modalDeleteUser = {
    title: "Удалить пользователя",
    action: "/chat",
    buttonText: "Удалить"
}

//открытие модального окна
const modalShow = (selector:string, params: {})=>{
    document.addEventListener("click", function(e){
        const button = document.querySelector(selector);
        if(!button || !button.contains(e.target as Node)) return;

        const modal = document.querySelector<HTMLDialogElement>("#chat-modal");
        if(!modal) return;
        modal.showModal();
        const content = Handlebars.compile(addUser)(params);
        modal.innerHTML = content;
    })
}

const modalHide = (selector: string)=>{
    document.addEventListener("click", function(e:Event){
        e.stopPropagation();
        const modal = document.querySelector<HTMLDialogElement>(selector);
        if(!modal) return;

        if (e.target === modal) {
            modal.innerHTML = "";
            modal.close();
        }
    })
}

toggleSidebarVisible();
//setChatActive();
dialogShow("#attache-button", "#attache-popup", "attache-button--active");
dialogShow("#user-button", "#user-popup", "dots-button--active");
modalShow("#user-button-add", modalAddUser);
modalShow("#user-button-delete", modalDeleteUser);
modalHide("#chat-modal");

interface ChatProps extends BlockOwnProps{
    selectedChatEmit?: (id:number)=>void;
}

export default class Chat extends Block<ChatProps>{
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

    constructor(props: ChatProps) {
        super(props);
        this.setProps({
            selectedChatEmit: this.setIsSelectedChat
        });
    }
}




