export const modalHide = ()=>{
    const modal = document.querySelector("#chat-modal") as HTMLDialogElement;
    if(!modal) return;

    modal.innerHTML = "";
    modal.close();
}
