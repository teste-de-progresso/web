import React from "react";
import { Form } from "../screens/questions/form";

export const Page = () => {

    const questionData = {
        body: "<p>fon</p>"
    }

    return (
        <div className="bg-primary-normal h-full w-full">
            <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
                <Form questionData={questionData} />
            </main>
        </div>
    );
};
