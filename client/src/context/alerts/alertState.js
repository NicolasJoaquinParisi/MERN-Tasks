import { useReducer } from "react";
import alertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../../types';

const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [ state, dispatch ] = useReducer(AlertReducer, initialState);

    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }

    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;