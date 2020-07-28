import {failureAuthentication, successAuthentication} from "./actions";
import {put} from "@redux-saga/core/effects";
import AuthenticationService from "../../../services/AuthenticationService";

export function* authenticationRequested(action) {
    const {email, password} = action.payload;

    const [result, data] = yield AuthenticationService.login(email, password);

    if(result) {
        yield put(successAuthentication(data));
    } else {
        yield put(failureAuthentication(data));
    }
}
