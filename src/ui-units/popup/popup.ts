import "./popup.css";
import Block from "../../framework/Block";

export default abstract class Popup extends Block{

    popupShow = (triggerButtonSelector: string, triggerButtonActiveClass: string)=>{
        document.addEventListener("click", (e: Event)=>{
            const button = document.querySelector(triggerButtonSelector);
            if(!button || !button.contains(e.target as Node)) return;

            const popup = this.refs["popup"] as HTMLDialogElement | null;
            if(!popup) return;

            if(!popup.open){
                popup.show();
                this.popupClose(button, triggerButtonActiveClass);
                button.classList.add(triggerButtonActiveClass);
            }
            else{
                button.classList.remove(triggerButtonActiveClass);
            }
        })
    }

    protected popupClose = (bindedButton:Element, bindedButtonActiveClass:string )=>{
        const popupCloseHandler = (e: Event)=>{
            const popup = this.refs["popup"] as HTMLDialogElement | null;
            if(!popup) return;

            if (!popup.contains(e.target as Node) && popup.open) {
                popup.close();
                bindedButton.classList.remove(bindedButtonActiveClass);
                document.removeEventListener("click", popupCloseHandler);
            }
        }
        //гарантия, что не будет доп. экземпляров
        document.removeEventListener("click", popupCloseHandler);
        document.addEventListener("click", popupCloseHandler)
    }
}
