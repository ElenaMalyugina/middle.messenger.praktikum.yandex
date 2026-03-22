import Block from "../../framework/Block";
import ModalTemplate from "./modal.hbs?raw";

export default class Modal extends Block{
    static componentName = 'Modal';
    protected template = ModalTemplate;

    //открытие модального окна
    /*modalShow = (triggerSelector:string, params: AddDeleteUserProps)=>{
        document.addEventListener("click", function(e){
            const button = document.querySelector(selector);
            if(!button || !button.contains(e.target as Node)) return;

            const modal = document.querySelector<HTMLDialogElement>("#chat-modal");
            if(!modal) return;
            modal.showModal();
            const content = new AddDeleteUser({...params}).element();
            if(content){
                modal.appendChild(content);
            }
        })
    }*/

    modalHide = ()=>{
        document.addEventListener("click", (e:Event)=>{
            e.stopPropagation();
            const modal = this.refs["modal"] as HTMLDialogElement || null;
            if(!modal) return;

            if (e.target === modal) {
                modal.innerHTML = "";
                modal.close();
            }
        })
    }

    protected componentDidMount(): void {
        this.modalHide()
    }
}
