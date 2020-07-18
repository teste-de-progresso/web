import {DECREASE_COUNTER, INCREASE_COUNTER, MYIP_REQUEST, MYIP_SUCCESS} from "./types";

export const increaseCounter = () => {
    return {
        type: INCREASE_COUNTER
    }
}

export const decreaseCounter = () => {
    return {
        type: DECREASE_COUNTER
    }
}

export const requestMyIp = () => {
    return {
        type: MYIP_REQUEST
    }
}

export const successMyIp = (myIp) => {
    return {
        type: MYIP_SUCCESS,
        payload: {
            myip: myIp
        }
    }
}
