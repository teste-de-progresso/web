import {DECREASE_COUNTER, INCREASE_COUNTER, MYIP_REQUEST, MYIP_SUCCESS} from "./types";

const initialState = {
    counter: 0,
    myip: undefined
}

export default function exampleReducer(state = initialState, action) {
    switch (action.type) {
        case INCREASE_COUNTER: {
            return {
                ...state,
                counter: state.counter + 1
            }
        }
        case DECREASE_COUNTER: {
            return {
                ...state,
                counter: state.counter - 1
            }
        }
        case MYIP_REQUEST: {
            return {
                ...state,
                myip: undefined
            }
        }
        case MYIP_SUCCESS: {
            return {
                ...state,
                myip: action.payload.myip
            }
        }
        default: {
            return state;
        }
    }
}
