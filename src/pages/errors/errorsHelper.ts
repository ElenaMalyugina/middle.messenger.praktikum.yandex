import { errorsList } from "../../constants/errorsList";
import type { ErrorProps } from "./errors";

export function getError(code:number): ErrorProps{
    return errorsList.filter(err => err.code == code)[0] ;
}
