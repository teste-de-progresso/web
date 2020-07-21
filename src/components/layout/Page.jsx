import React from "react";
import {MyIp} from "../myip/myip";
import {Counter} from "../counter/Counter";

export const Page = () => {
    return (
        <div className="bg-primary-normal w-full h-full">
            <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
                <div className="flex flex-row">
                    <Counter/>
                    <MyIp/>
                </div>
            </main>
        </div>
    )
}
