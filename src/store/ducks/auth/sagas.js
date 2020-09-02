import { failedLoadAuthentication, failureAuthentication, successAuthentication } from "./actions";
import { put } from "@redux-saga/core/effects";
import AuthenticationService from "../../../services/AuthenticationService";
import * as jwt from "jsonwebtoken";

export function* authenticationRequested(action) {
    const { email, password } = action.payload;

    const [result, data] = yield AuthenticationService.login(email, password);

    if (result) {
        yield put(successAuthentication(data));
        localStorage.setItem("auth", data);
    } else {
        yield put(failureAuthentication(data));
        localStorage.removeItem("auth");
    }
}

export function* authentcationLoad() {
    const token = localStorage.getItem("auth");
    const guid = process.env.REACT_APP_JWT_SECRET_KEY || '1cb26f40-498b-4f72-a00a-e8633abc5957'

    if (token && jwt.verify(token, guid)) {
        yield put(successAuthentication(token));
    } else {
        yield put(failedLoadAuthentication());
    }
}
