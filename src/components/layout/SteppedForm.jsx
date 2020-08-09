import React, {useState} from "react";
import {Button} from "../widgets/Button";

export const SteppedForm = ({children}) => {

    const allSteps = children.map(x => x.props['step']);
    const minStep = Math.min(...allSteps);
    const maxStep = Math.max(...allSteps);
    const [currentStep, setCurrentStep] = useState(minStep);


    const handleNext = () => {
        setCurrentStep(Math.min(currentStep + 1, maxStep));
    }

    const handleBack = () => {
        setCurrentStep(Math.max(currentStep - 1, minStep));
    }

    return (
        <div>
            {children.map(x => x.props['step'] === currentStep ? x : null)}

            <div className="flex justify-end space-x-2">
                <Button className={minStep === currentStep ? "hidden" : ""} onClick={() => handleBack()}>Retornar</Button>
                <Button onClick={() => handleNext()}>{maxStep === currentStep ? "Finalizar" : "Prosseguir"}</Button>
            </div>
        </div>
    )
}
