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
        text: "3–20 символов, латиница. Может содержать цифры, но не состоит только из них. Без пробелов, допустимы дефис и подчёркивание"
    };
}

const validatorEmailPattern = (value: unknown)=>{
    const pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z0-9._-]*$/;

    if(value && typeof value == "string" && pattern.test(value)){
        return noError
    }
    return {
        isValid: false,
        text: "Адрес электронной почты неверен"
    };
}

const validatorPasswordPattern = (value:unknown)=>{
    const pattern = /^(?=.{8,40}$)(?=.*[A-Z])(?=.*\d).*$/;

    if(value && typeof value == "string" && pattern.test(value)){
        return noError
    }

    return {
        isValid: false,
        text: "8–40 символов, минимум одна заглавная буква и одна цифра"
    };
}

const validatorPhonePattern = (value:unknown)=>{
    const pattern = /^\+?(?:\d[-\s]?){9,14}\d$/;

    if(value && typeof value == "string" && pattern.test(value)){
        return noError
    }

    return {
        isValid: false,
        text: "10–15 символов, цифры, может начинаться с плюса. Разешены пробелы и дефисы"
    };
}

const validatorRepeatPassword = (value:unknown)=>{
    const oldPassword = document.querySelector<HTMLInputElement>("#new_password"); //в данном случае удобнее напрямую;
    if(!oldPassword) return noError //валидатор не на своем месте

    const value2 = oldPassword.value;
    if(value && typeof value == "string" && value === value2){
        return noError
    }

    return {
        isValid: false,
        text: "Пароли не совпадают"
    };
}

export const validate = (value: unknown, validators:string[]): formError =>{
    const validatorsResult = validators.map((validator:string)=>{
        validator=validator.trim();

        if(validator == "required"){
            return validatorRequired(value);
        }

        if(validator == "minval"){
            return validatorMinVal(value);
        }

        if(validator == "username"){
            return validatorUserNamePattern(value);
        }

        if(validator == "email"){
            return validatorEmailPattern(value)
        }

        if(validator == "login"){
            return validatorLoginPattern(value);
        }

        if(validator == "password"){
            return validatorPasswordPattern(value);
        }

        if(validator == "phone"){
            return validatorPhonePattern(value);
        }

        if(validator == "repeatpassword"){
            return validatorRepeatPassword(value);
        }


        return noError
    })
    return validatorsResult.find(el=>!el.isValid) || noError;
}



