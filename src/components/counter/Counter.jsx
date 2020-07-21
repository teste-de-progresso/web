import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {decreaseCounter, increaseCounter} from "../../store/ducks/example/actions";
import {Card} from "../widgets/Card";
import {Button} from "../widgets/Button";

export const Counter = () => {
    const counter = useSelector(state => state.example)
    const dispatch = useDispatch();

    const increase = () => {
        dispatch(increaseCounter());
    }

    const decrease = () => {
        dispatch(decreaseCounter());
    }

    return (
        <Card title={"Contador"}>
            <p>Counter: {counter.counter}</p>
            <Button onClick={() => increase()}>Incrementar</Button>
            <Button onClick={() => decrease()}>Decrementar</Button>
        </Card>
    )
}
