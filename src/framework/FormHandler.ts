export const tempSubmitHandler =
    (refs:Record<string, Element>) => {

        const keys = Object.keys(refs);

        keys.forEach(el=>{
            if(refs[el] instanceof HTMLInputElement){
                console.log(refs[el].value)
            }
        })
    }
