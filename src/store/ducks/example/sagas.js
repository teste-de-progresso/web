import {put} from "@redux-saga/core/effects";
import {successMyIp} from "./actions";

export function* myIpRequested() {
    const response = yield fetch("https://httpbin.org/ip").then(x => x.json());
    yield put(successMyIp(response['origin']));
}
