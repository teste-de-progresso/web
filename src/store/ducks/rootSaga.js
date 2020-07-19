import {all, takeLatest} from "@redux-saga/core/effects";
import {MYIP_REQUEST} from "./example/types";
import {myIpRequested} from "./example/sagas";

export default function* rootSaga() {
    return yield all([
        takeLatest(MYIP_REQUEST, myIpRequested)
    ])
}
