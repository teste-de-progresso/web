import React from "react";
import { Home } from "../screens/home"
import {SteppedForm} from "./SteppedForm";
import {Step} from "./Step";
import {EnunciadoForm} from "../screens/questions/form/EnunciadoForm";
import {AlternativesForm} from "../screens/questions/form/AlternativesForm";
import {FeaturesForm} from "../screens/questions/form/FeaturesForm";

export const Page = () => {
    return (
        <div className="bg-primary-normal h-full w-full">
            <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
                <Home />
                {/* <SteppedForm>
                    <Step step={0}>
                        <EnunciadoForm/>
                    </Step>
                    <Step step={1}>
                        <AlternativesForm/>
                    </Step>
                    <Step step={2}>
                        <FeaturesForm/>
                    </Step>
                </SteppedForm> */}
            </main>
        </div>
    );
};
