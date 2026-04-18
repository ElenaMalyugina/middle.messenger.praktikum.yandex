import "./messages-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesListTemplate from "./messages-list.hbs?raw";
import Store from "../../../framework/store/Store";
import { MessageModel, type Message } from "../../../types/message";
import { isEqualDay } from "../../../utils/datetime";
import MessagesController from "../../../controllers/messagesController";

interface MessagesListProps extends BlockOwnProps{
    messages: MessageModel[];
    showAddButton: boolean;
    addOldMessages: (count: number)=>void;
}

export default class MessagesList extends Block<MessagesListProps>{
    static componentName = 'MessagesList';
    protected template = MessagesListTemplate;
    private messagesController = new MessagesController();
    private messageCount = 0;
    private scrollEl: HTMLElement | null = null;

    constructor(props: MessagesListProps){
        super(props);
        this.props.addOldMessages = this.addOldMessages;
        this.props.messages = [];

        Store.subscribe(()=>{
            this.updateMessages();
        })
    }

    protected componentDidMount(): void {
        this.scrollEl = document.getElementById("chat-scroll");
    }

    addOldMessages=()=>{
        if(this.scrollEl){
            this.scrollEl.classList.add("no-scroll");
        }

        this.messagesController.getMessages(this.messageCount);
    }

    protected updateMessages = ()=>{
        const messages = Store.getState().messages as Message[];
        if(!messages || messages.length === this.messageCount) return;
        //чтобы не дергалось при скролле
        this.messagesBuilder(messages);
        this.addMessageAndScroll();

        this.messageCount = messages.length;

        if(this.scrollEl && this.scrollEl.classList.contains("no-scroll")){
            setTimeout(()=>{
                this.scrollEl?.classList.remove("no-scroll");
            }, 5000)
        }
    }

    private async addMessageAndScroll() {
        const chatScroll = document.getElementById("chat-scroll");
        if (!chatScroll) return;
        if(chatScroll.classList.contains("no-scroll")) return;

        const images: NodeListOf<HTMLImageElement> = chatScroll.querySelectorAll("img:not([data-loaded])");

        if (images.length === 0) {
            // Без изображений — сразу скроллим
            chatScroll.scrollTop = chatScroll.scrollHeight;
            return;
        }

        // Устанавливаем флаг загрузки для всех изображений
        images.forEach(img => img.setAttribute("data-loading", "true"));

        // Создаём промис для загрузки изображений с таймаутом
        const imageLoadPromise = Promise.race([
            // Основной промис — ждём загрузки всех изображений
            Promise.all(
                Array.from(images).map(img =>
                    new Promise<void>(resolve => {
                        if (img.complete) {
                            img.removeAttribute("data-loading");
                            img.setAttribute("data-loaded", "true");
                            resolve();
                            return;
                        }

                        img.addEventListener("load", () => {
                            img.removeAttribute("data-loading");
                            img.setAttribute("data-loaded", "true");
                            resolve();
                        }, { once: true });

                        img.addEventListener("error", () => {
                            // В случае ошибки тоже считаем загруженным
                            img.removeAttribute("data-loading");
                            img.setAttribute("data-loaded", "true");
                            resolve();
                        }, { once: true });
                    })
                )
            ),
            // Таймаут — если изображения не загрузились за 5 с
            new Promise<void>(resolve => setTimeout(resolve, 5000))
        ]);

        // Ждём либо загрузки изображений, либо таймаута
        await imageLoadPromise;
        // В любом случае прокручиваем вниз
        chatScroll.scrollTop = chatScroll.scrollHeight;
    }

    protected messagesBuilder = (messages: Message[]): void => {
        const thisMessages = [...messages];

        //добавление свойства смены даты
        const messagesWithIsChangedDate = thisMessages.map((mess: Message, i, sourceMessages )=>{
            const messageItem: MessageModel = mess;

            const isChangedDate = i ==0 || !isEqualDay(mess.time, sourceMessages[i-1].time);
            messageItem.isChangedDate = isChangedDate;

            return messageItem;
        })

        const resMessages = messagesWithIsChangedDate;

        this.setProps({
            messages: [...resMessages]
        });
    }
}
