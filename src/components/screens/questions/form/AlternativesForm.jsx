import React from "react";
import {Card} from "../../../widgets/Card";
import {TextEditor} from "./TextEditor";
import {Input} from "../../../widgets/Input";

export const AlternativesForm = () => {

    return (
        <Card title={"Alternativas"}>
            <div className={"border border-gray-300 rounded p-4 mt-4 shadow-sm"}>
                <div className="flex space-x-4">
                    <div className="w-full">
                        <h2 className="text-xl font-medium">Alternativa Correta</h2>
                        <TextEditor/>
                    </div>
                    <div className="flex flex-col space-y-4 w-full">
                        <div>
                            <h2 className="text-xl font-medium">Explicação</h2>
                            <TextEditor/>
                        </div>
                        <div>
                            <h2 className="text-xl font-medium">Referência</h2>
                            <Input/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"border border-gray-300 rounded p-4 mt-4 shadow-sm"}>
                <h2 className="text-xl font-medium">Alternativas Incorretas</h2>
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-full">
                            <TextEditor/>
                        </div>
                        <div className="w-full">
                            <TextEditor/>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-full">
                            <TextEditor/>
                        </div>
                        <div className="w-full">
                            <TextEditor/>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
