import "./popup.css";
import Block from "../../framework/Block";

export default abstract class Popup extends Block{

    popupShow = (event: Event, triggerButtonSelector: string, triggerButtonActiveClass: string)=>{
        const popup = this.refs["popup"] as HTMLDialogElement | null;
        if(!popup) return;

        if(!popup.open){
            popup.show();
            event.stopPropagation(); //предовращение обработчика закрытия сразу после открытия
            this.popupCloseListener(triggerButtonSelector, triggerButtonActiveClass);
        }
    }

    protected popupCloseListener = (triggerButtonSelector:string, bindedButtonActiveClass:string )=>{
        const popupCloseHandler = (e: Event)=>{
            const popup = this.refs["popup"] as HTMLDialogElement | null;
            if(!popup) return;

            if (!popup.contains(e.target as Node) && popup.open) {
                popup.close();
                const bindedButton = document.querySelector(triggerButtonSelector);

                if(bindedButton){
                    bindedButton.classList.remove(bindedButtonActiveClass);
                }

                document.removeEventListener("click", popupCloseHandler);
            }
        }
        //гарантия, что не будет доп. экземпляров
        document.removeEventListener("click", popupCloseHandler);
        document.addEventListener("click", popupCloseHandler)
    }
}
