import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {decreaseCounter, increaseCounter} from "../../store/ducks/example/actions";

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
        <div>
            <p>Counter: {counter.counter}</p>
            <button onClick={() => increase()}>Incrementar</button><br/>
            <button onClick={() => decrease()}>Decrementar</button>
        </div>
    )
}
