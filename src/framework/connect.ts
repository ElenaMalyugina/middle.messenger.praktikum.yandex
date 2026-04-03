import type { Indexed } from "../types/indexed";
import { deepEqual } from "../utils/deepEqual";
import Store from "./store/Store";

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function(Component: any) {
        return class extends Component{
            constructor(props: Indexed) {
                // сохраняем начальное состояние
                let state = mapStateToProps(Store.getState());

                super({ ...props, ...state });

                // подписываемся на событие
                Store.subscribe(() => {
                // при обновлении получаем новое состояние
                    const newState = mapStateToProps(Store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!deepEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        }
    }
}
