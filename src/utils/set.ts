import type { Indexed } from "../types/indexed";

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed<unknown> {

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    if (!object || typeof object !== 'object') {
        return object as Indexed;
    }

    const keys = path.split('.');
    let current: Indexed = object as Indexed;

    // Проходим по всем ключам, кроме последнего
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // Если ключ не существует или не является объектом — создаём пустой объект
        if (!current[key] || typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
        }

        current = current[key] as Indexed;
    }

    // Устанавливаем значение в последний ключ пути
    current[keys[keys.length - 1]] = value;

    return object as Indexed;
}

