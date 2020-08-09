import React from "react";
import { Form } from "../screens/questions/form";
import {SteppedForm} from "./SteppedForm";
import {Step} from "./Step";

export const Page = () => {

    const questionData = {
        body: "<p>fon</p>"
    }

    return (
        <div className="bg-primary-normal h-full w-full">
            <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
                <SteppedForm>
                    <Step step={0}>
                        <Form questionData={questionData} />
                    </Step>
                    <Step step={1}>
                        LOL IT WORKS
                    </Step>
                </SteppedForm>
            </main>
        </div>
    );
};
