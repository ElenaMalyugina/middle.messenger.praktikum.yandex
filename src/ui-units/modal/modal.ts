import Block from "../../framework/Block";
import ModalTemplate from "./modal.hbs?raw";

export default class Modal extends Block{
    static componentName = 'Modal';
    protected template = ModalTemplate;

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
