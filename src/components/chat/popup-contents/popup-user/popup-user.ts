import type { BlockOwnProps } from "../../../../framework/Block";
import Popup from "../../../../ui-units/popup/popup";
import AddDeleteUser, { type typeContent } from "../../modal-contents/add-delete-user/add-delete-user";
import PopupUserTemplate from "./popup-user.hbs?raw";

interface PopupUserProps extends BlockOwnProps{
    modalShow: (e:Event, button: HTMLElement)=>void;
}

export default class PopupUser extends Popup<PopupUserProps>{
    static componentName = 'PopupUser';
    protected template = PopupUserTemplate;

    //пока открытие сделано на прямом взаимодействии с DOM, так проще доступ к элементу
    modalShow = (e: Event, button: HTMLElement)=>{
        const modal = document.querySelector("#chat-modal");
        if(!modal || !( modal instanceof HTMLDialogElement)) return;
        modal.showModal();

        const action = button.getAttribute("data-action");
        if(!action) return;

        const isValidTypeContent = (value: string): value is typeContent =>{
            return value === "add" || value === "delete";
        }

        if(!isValidTypeContent(action)) return;

        const content = new AddDeleteUser({ type: action }).element();

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
