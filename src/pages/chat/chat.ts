import "/src/components/sidebar/sidebar.css";
import "./chat.css";
import "/src/components/row-blocks/input-block/input-block.css";
import "/src/components/chat/chat-sidebar/chat-sidebar.css";
import "/src/components/chat/chat-search/chat-search.css";
import "/src/components/chat/chat-header/chat-header.css";
import "/src/components/chat/chat-body/chat-body.css";
import "/src/components/chat/no-messages/no-messages.css";
import "/src/components/chat/chat-avatar/chat-avatar.css"
import "/src/components/chat/chats-list/chats-list.css";
import "/src/components/chat/chat-item/chat-item.css";
import "/src/components/chat/messages-box/messages-box.css";
import "/src/components/chat/messages-box-header/messages-box-header.css";
import "/src/components/chat/messages-list/messages-list.css";
import "/src/components/chat/message-item/message-item.css";
import "/src/components/chat/message-send/message-send.css";
import "/src/components/chat/popup-contents/popup-contents.css";
import "/src/components/chat/modal-contents/modal-contents.css";
import Handlebars from "handlebars";
import {getDayYearString, getTimeString} from "../../utils/datetime.ts";
import sidebarTemplate from "/src/components/sidebar/sidebar.hbs?raw";
import chatSidebarTemplate from "/src/components/chat/chat-sidebar/chat-sidebar.hbs?raw";
import chatSearchTemplate from "/src/components/chat/chat-search/chat-search.hbs?raw";
import chatAvatarTemplate from "/src/components/chat/chat-avatar/chat-avatar.hbs?raw";
import chatsListTemplate from "/src/components/chat/chats-list/chats-list.hbs?raw";
import chatItemTemplate from "/src/components/chat/chat-item/chat-item.hbs?raw";
import chatHeaderTemplate from "/src/components/chat/chat-header/chat-header.hbs?raw";
import chatBody from "/src/components/chat/chat-body/chat-body.hbs?raw";
import messagesBoxTemplate from "/src/components/chat/messages-box/messages-box.hbs?raw";
import messagesBoxHeaderTemplate from "/src/components/chat/messages-box-header/messages-box-header.hbs?raw";
import messagesListTemplate from "/src/components/chat/messages-list/messages-list.hbs?raw";
import messageItemTemplate from "/src/components/chat/message-item/message-item.hbs?raw";
import messageSendTemplate from "/src/components/chat/message-send/message-send.hbs?raw";
//import noMessagesTemplate from "/src/components/chat/no-messages/no-messages.hbs?raw";
import popupFiles from "/src/components/chat/popup-contents/popup-files/popup-files.hbs?raw";
import popupUser from "/src/components/chat/popup-contents/popup-user/popup-user.hbs?raw";
import addUser from "/src/components/chat/modal-contents/add-delete-user/add-delete-user.hbs?raw";
import { registerComponent } from './../../framework/RegisterComponent';
import chatTemplate from "./chat.hbs?raw";
import {chats}  from "../../mocks/chats.ts";
import { messages } from "../../mocks/messages";
import NoMessages from "../../components/chat/no-messages/no-messages.ts";
import Block from "../../framework/Block.ts";

Handlebars.registerPartial("sidebar", sidebarTemplate);
Handlebars.registerPartial("chat-sidebar", chatSidebarTemplate);
Handlebars.registerPartial("chat-search", chatSearchTemplate);
Handlebars.registerPartial("chat-avatar", chatAvatarTemplate);
Handlebars.registerPartial("chat-header", chatHeaderTemplate);
Handlebars.registerPartial("chats-list", chatsListTemplate);
Handlebars.registerPartial("chat-item", chatItemTemplate);
Handlebars.registerPartial("chat-body", chatBody);
Handlebars.registerPartial("messages-box", messagesBoxTemplate);
Handlebars.registerPartial("messages-box-header", messagesBoxHeaderTemplate);
Handlebars.registerPartial("messages-list", messagesListTemplate);
Handlebars.registerPartial("message-item", messageItemTemplate);
Handlebars.registerPartial("message-send", messageSendTemplate);
//Handlebars.registerPartial("no-messages", noMessagesTemplate);
Handlebars.registerPartial("popup-files-content", popupFiles);
Handlebars.registerPartial("popup-user-content", popupUser);
Handlebars.registerPartial("add-user-content", addUser);


registerComponent(NoMessages);

//установка css-классов для сообщения автора
Handlebars.registerHelper("isAuthor", function(userId){
    if(userId === 111){  //для демо пусть будет автор - это юзер 111
        return true;
    }
    return false;
});

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

let isSelectedChat = false;

//для демо смены класса временное решение
const setChatActive = ()=>{
    document.addEventListener("click", function(e: Event){
        const target = e.target as HTMLElement;
        const isTargetChatItem = target.classList.contains("js-chat-item") || target.closest(".js-chat-item");
        if(!isTargetChatItem) return;

        const chatItems = document.querySelectorAll(".js-chats-list .js-chat-item");
        const classActive = "chat-item--active";
        chatItems.forEach(el=> el.classList.remove(classActive));
        target.closest(".js-chat-item")?.classList.add(classActive);
        isSelectedChat = true;

        const sidebar = document.querySelector("#chat-sidebar");
        const classSidebarActive = "chat__sidebar--active";
        if(sidebar){
            if(sidebar.classList.contains(classSidebarActive)){
                sidebar.classList.remove(classSidebarActive);
            }
        }

        //Только для демо
        const newMessagesBoxTemplate = Handlebars.compile(messagesBoxTemplate)({chats, messages});
        const rootMessagesBlock = document.querySelector("#chat-body");
        if(!rootMessagesBlock)return;

        rootMessagesBlock.innerHTML = newMessagesBoxTemplate;
    });
}

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

const thisMessages = [...messages];

//добавление свойства смены даты
const messagesWithIsChangedDate = thisMessages.map((mess:any, i, sourceMessages)=>{
    mess.isChangedDate = false;
    const isChangedDate = i==0 || mess.time !== sourceMessages[i-1].time;

    if(isChangedDate){
        mess.isChangedDate = true;
    }
    return mess;
})

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
setChatActive();
dialogShow("#attache-button", "#attache-popup", "attache-button--active");
dialogShow("#user-button", "#user-popup", "dots-button--active");
modalShow("#user-button-add", modalAddUser);
modalShow("#user-button-delete", modalDeleteUser);
modalHide("#chat-modal");

//export default Handlebars.compile(chatTemplate)({chats, messagesWithIsChangedDate, isSelectedChat});

class Chat extends Block{
    static componentName = 'Chat';
    protected template = chatTemplate;
}

export default new Chat({}).element();


