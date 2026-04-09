import "/src/components/chat/popup-contents/popup-contents.css";
import type { BlockOwnProps } from "../../../../framework/Block";
import Popup from "../../../../ui-units/popup/popup";
import PopupUserTemplate from "./popup-user.hbs?raw";
import AddUser from "../../modal-contents/add-user/add-user";
import DeleteUser from "../../modal-contents/delete-user/delete-user";
import type { typeContent } from "../../../../types/addDeleteUser";


interface PopupUserProps extends BlockOwnProps{
    modalShow: (e:Event, button: HTMLElement)=>void;
}

export default class PopupUser extends Popup<PopupUserProps>{
    static componentName = 'PopupUser';
    protected template = PopupUserTemplate;

    //пока открытие сделано на прямом взаимодействии с DOM, так проще доступ к элементу
    modalShow = (_e: Event, button: HTMLElement)=>{
        const modal = document.querySelector("#chat-modal");
        if(!modal || !( modal instanceof HTMLDialogElement)) return;
        modal.showModal();

        const action = button.getAttribute("data-action");
        if(!action) return;

        const isValidTypeContent = (value: string): value is typeContent =>{
            return value === "add" || value === "delete";
        }

        if(!isValidTypeContent(action)) return;

        let content: Element | null = null;

        if(action === "add"){
            content = new AddUser().element();
        }
        else if(action === "delete"){
            content = new DeleteUser().element();
        }

        if(content){
            modal.appendChild(content)
        }
    }

    protected componentDidMount(){
        this.setProps({
            modalShow: this.modalShow

        })
    }
}
