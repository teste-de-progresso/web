import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestMyIp} from "../../store/ducks/example/actions";

export const MyIp = () => {
    const myip = useSelector(state => state.example.myip)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestMyIp())
    }, [dispatch]);

    return (
        <p>Meu ip é: {myip}</p>
    )
}
