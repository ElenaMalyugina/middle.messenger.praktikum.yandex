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

const validatorUserNamePattern = (value:unknown)=>{
    const pattern=/^[A-ZА-ЯЁ][a-zа-яё-]*$/;
    if(value && typeof value == "string" && pattern.test(value)){
        return noError
    }
    return {
        isValid: false,
        text: "Латиница или кириллица, первая буква заглавная. Без пробелов и цифр, из спецсимволов — только дефис"
    };
}

const validatorLoginPattern = (value: unknown)=>{
    const pattern=/^(?=.{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/;

    if(value && typeof value == "string" && pattern.test(value)){
        return noError
    }
    return {
        isValid: false,
        text: "Латиница или кириллица, первая буква заглавная. Без пробелов и цифр, из спецсимволов — только дефис"
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

        if(validator == "username"){
            return validatorUserNamePattern(value);
        }

        if(validator == "validatorLoginPattern"){
            return validatorLoginPattern(value);
        }
        return noError
    })
    return validatorsResult.find(el=>!el.isValid) || noError;
}



