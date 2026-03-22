import Block, { type BlockOwnProps } from "../../framework/Block";

export default abstract class Popup extends Block<BlockOwnProps>{
    constructor(props: BlockOwnProps) {
        super(props)
    }

    dialogShow = (selectorButton: string, selectorPopup: string, activeClass: string)=>{
        document.addEventListener("click", (e: Event)=>{
            const button = document.querySelector(selectorButton);
            if(!button || !button.contains(e.target as Node)) return;

            const popup = document.querySelector<HTMLDialogElement>(selectorPopup);
            if(!popup) return;

            if(!popup.open){
                popup.show();
                this.popupClose(popup, button, activeClass);
                button.classList.add(activeClass);
            }
            else{
                button.classList.remove(activeClass);
            }
        })
    }


    popupClose = (popup:HTMLDialogElement, button:Element, activeClass:string )=>{
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
}
