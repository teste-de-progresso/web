import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestMyIp} from "../../store/ducks/example/actions";
import {Card} from "../widgets/Card";

export const MyIp = () => {
    const myip = useSelector(state => state.example.myip)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestMyIp())
    }, [dispatch]);

    return (
        <Card title={"Meu IP"}>
            <p>Meu ip é: {myip}</p>
        </Card>
    )
}
