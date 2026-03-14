export const tempSubmitHandler = (refs:Record<string, Element>) => {
    const keys = Object.keys(refs);

    keys.forEach(el=>{
        if(refs[el] instanceof HTMLFormElement){
            const formData = new FormData(refs[el]);
            const data = Object.fromEntries(formData);
            console.log(data);
        }
    })
}
