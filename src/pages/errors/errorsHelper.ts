import { errorsList } from "../../constants/errorsList";

export function getError(code:number){
    return errorsList.filter(err => err.code == code)[0] ;
}