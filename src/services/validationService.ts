export type formError = {
    isValid: boolean;
    text: string | null;
}

export const noError: formError={
    isValid: true,
    text: null
}

const validatorRequired = (value:unknown)=>{
    if(value && typeof value == "string" && value.length){
        return noError;
    }
    return {
        isValid: false,
        text: "Это обязательное поле"
    };
}

const validatorMinVal = (value:unknown)=>{
    if(value && typeof value == "string" && value.length>3){
        return noError;
    }
    return {
        isValid: false,
        text: "Мало букв"
    };
}

export const validate = (value: unknown, validators:string[]): formError =>{
    const validatorsResult = validators.map((validator:string)=>{
        if(validator == "required"){
            return validatorRequired(value);
        }

        if(validator == "minval"){
            return validatorMinVal(value);
        }
        return noError
    })
    return validatorsResult.find(el=>!el.isValid) || noError;
}



