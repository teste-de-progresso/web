import React from "react";
import {Counter} from "../counter/Counter";
import {MyIp} from "../myip/myip";
import {CardGrid} from "../widgets/CardGrid";

export const Home = () => {
    return (
        <CardGrid>
            <Counter/>
            <MyIp/>
            <MyIp/>
            <Counter/>
        </CardGrid>
    )
}
