export abstract class BaseAPI {
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    create<T>(_data: T): Promise<unknown> {
        throw new Error('Not implemented');
    }

    request(_data: unknown): Promise<unknown> {
        throw new Error('Not implemented');
    }

    update<T>(_data: T): Promise<unknown> {
        throw new Error('Not implemented');
    }

    delete<T>(_data: T):Promise<unknown> {
        throw new Error('Not implemented');
    }
}


