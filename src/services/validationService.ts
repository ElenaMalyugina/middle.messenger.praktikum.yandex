export type formError = {
    isValid: boolean;
    text: string | null;
}

export const initialError={
    isValid: true,
    text: null
}

export const validateRequired = (value: string | null): formError =>{
    if(value && value.length){
        return initialError;
    }

    return {
        isValid: false,
        text: "Это обязательное поле"
    };
}


