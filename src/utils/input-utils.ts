//Всплывающие лейблы
export const floatLabels = (blockSelector: string, activeClass: string)=>{
    const inputs = document.querySelectorAll<HTMLFormElement>(`${blockSelector} input`);

    inputs.forEach(input => {
        const container = input.closest<HTMLElement>(blockSelector);
        if(!container) return;
        const notEmptyInputClass = activeClass;//"input-block--input-not-empty";

        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                container.classList.add(notEmptyInputClass);
            } else {
                container.classList.remove(notEmptyInputClass);
            }
        });
    });
}

