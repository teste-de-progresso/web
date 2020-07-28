import React from "react";
import {MyIp} from "../myip/myip";
import {Counter} from "../counter/Counter";
import {CardGrid} from "../widgets/CardGrid";
import {Home} from "../screens/Home";

export const Page = () => {
    return (
        <div className="bg-primary-normal w-full h-full">
            <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
                <Home/>
            </main>
        </div>
    )
}
