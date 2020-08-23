import React, {useContext} from "react";
import {Card} from "../../../widgets/Card";
import {TextEditor} from "./TextEditor";
import {Input} from "../../../widgets/Input";
import {FormContext} from "../../../layout/SteppedForm";

export const AlternativesForm = () => {
    const formContext = useContext(FormContext);

    return (
        <Card title={"Alternativas"}>
            <div className={"border border-gray-300 rounded p-4 mt-4 shadow-sm"}>
                <div className="flex space-x-4">
                    <div className="w-full">
                        <h2 className="text-xl font-medium">Alternativa Correta</h2>
                        <TextEditor name={"correctAlternative"}/>
                    </div>
                    <div className="flex flex-col space-y-4 w-full">
                        <div>
                            <h2 className="text-xl font-medium">Explicação</h2>
                            <TextEditor name={"correctAlternativeExplanation"}/>
                        </div>
                        <div>
                            <h2 className="text-xl font-medium">Referência</h2>
                            <Input name={"correctAlternativeExplanationReference"} ref={formContext.register}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"border border-gray-300 rounded p-4 mt-4 shadow-sm"}>
                <h2 className="text-xl font-medium">Alternativas Incorretas</h2>
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-full">
                            <TextEditor name={"incorrectAlternative1"}/>
                        </div>
                        <div className="w-full">
                            <TextEditor name={"incorrectAlternative2"}/>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-full">
                            <TextEditor name={"incorrectAlternative3"}/>
                        </div>
                        <div className="w-full">
                            <TextEditor name={"incorrectAlternative4"}/>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}