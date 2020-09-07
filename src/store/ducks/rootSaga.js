import { all, takeLatest } from "@redux-saga/core/effects";
import { AUTHENTICATION_LOAD, AUTHENTICATION_REQUEST } from "./auth/types";
import { authentcationLoad, authenticationRequested } from "./auth/sagas";

export default function* rootSaga() {
    return yield all([
        takeLatest(AUTHENTICATION_REQUEST, authenticationRequested),
        takeLatest(AUTHENTICATION_LOAD, authentcationLoad)
    ])
}
