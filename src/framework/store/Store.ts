import type { Indexed } from "../../types/indexed";
import { merge } from "../../utils/merge";
import { set } from "../../utils/set";

type Listener = () => void;

class Store {
    private state: Indexed = {};
    private listeners: Set<Listener> = new Set();

    public getState() {
        return this.state;
    }

    public setState(path: string, value: unknown) {
        // Создаем новый объект состояния вместо изменения существующего
        this.state = merge(this.state, set({}, path, value));
        // Уведомляем всех подписчиков об изменении
        this.emit();
    }

    public subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        console.log(this.listeners)
        // Возвращаем функцию для отписки
        return () => {
            this.listeners.delete(listener);
        };
    }

    public clearState(){
        this.state = {};
    }

    private emit() {
        this.listeners.forEach(listener => listener());
    }

    public unsubscribe(listener: Listener){
        console.log(this.listeners)
        this.listeners.delete(listener);
    }
}

export default new Store();
