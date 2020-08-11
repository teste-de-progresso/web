import {all, takeLatest} from "@redux-saga/core/effects";
import {MYIP_REQUEST} from "./example/types";
import {myIpRequested} from "./example/sagas";
import {AUTHENTICATION_LOAD, AUTHENTICATION_REQUEST} from "./auth/types";
import {authentcationLoad, authenticationRequested} from "./auth/sagas";

export default function* rootSaga() {
    return yield all([
        takeLatest(MYIP_REQUEST, myIpRequested),
        takeLatest(AUTHENTICATION_REQUEST, authenticationRequested),
        takeLatest(AUTHENTICATION_LOAD, authentcationLoad)
    ])
}
