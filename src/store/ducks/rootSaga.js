import {all, takeLatest} from "@redux-saga/core/effects";
import {MYIP_REQUEST} from "./example/types";
import {myIpRequested} from "./example/sagas";
import {AUTHENTICATION_REQUEST} from "./auth/types";
import {authenticationRequested} from "./auth/sagas";

export default function* rootSaga() {
    return yield all([
        takeLatest(MYIP_REQUEST, myIpRequested),
        takeLatest(AUTHENTICATION_REQUEST, authenticationRequested)
    ])
}
