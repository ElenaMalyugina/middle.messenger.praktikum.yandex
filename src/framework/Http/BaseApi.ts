export abstract class BaseAPI {
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    create<T>(data: T): Promise<unknown> {
        throw new Error('Not implemented');
    }

    request() { throw new Error('Not implemented'); }

    update<T>(data: T): Promise<unknown> {
        throw new Error('Not implemented');
    }

    delete() { throw new Error('Not implemented'); }
}


