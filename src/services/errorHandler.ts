import type { ApiError } from "../types/apiError";

export const errorHandler = (error: unknown)=>{
    const defaultError = "Что-то пошло не так";
    if (!error || typeof error !== 'object') {
        return defaultError;
    }

    const response = (error as ApiError).response;

    if (typeof response !== 'string') {
        return defaultError;
    }

    try {
        const parsed = JSON.parse(response);

        // Проверяем наличие и тип поля reason
        if (parsed && parsed.reason) {
            return parsed.reason;
        }

        return defaultError;
    }
    catch (parseError) {
        console.error("Не могу распарсить ошибку", parseError);
        return defaultError;
    }


}
