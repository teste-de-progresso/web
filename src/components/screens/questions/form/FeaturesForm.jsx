import React from "react";
import {Card} from "../../../widgets/Card";
import {Input} from "../../../widgets/Input";

export const FeaturesForm = () => {
    const currentYear = new Date().getFullYear()

    return (
        <Card title={"Características"}>
            <div className="flex flex-col space-y-4">
                <div className={"flex space-x-2"}>
                    <div className="w-full">
                        <h2>Autoria</h2>
                        <select className="w-full rounded p-1 w-full border-gray-400 border shadow-sm">
                            <option selected={true}>Própria</option>
                            <option>Terceiros</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <h2>Tipo</h2>
                        <select className="w-full rounded p-1 w-full border-gray-400 border shadow-sm">
                            <option>Objetiva</option>
                            <option>Discurssiva</option>
                        </select>
                    </div>
                </div>
                <div className={"border bg-white border-gray-300 rounded shadow-sm"}>
                    <div className="p-4 flex space-x-2">
                        <div className="w-full">
                            <h2>Referência</h2>
                            <Input className="block rounded p-1 w-full border-gray-400 border shadow-sm" />
                        </div>
                        <div className="w-full  ">
                            <h2>Ano</h2>
                            <Input type="number" min="1999" max={currentYear} step="1" />
                        </div>
                    </div>
                </div>
                <div className={"flex space-x-2"}>
                    <div className="w-full">
                        <h2>Taxonomia de Bloom</h2>
                        <select className="w-full rounded p-1 w-full border-gray-400 border shadow-sm">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <h2>Dificuldade</h2>
                        <select className="w-full rounded p-1 w-full border-gray-400 border shadow-sm">
                        <option>Fácil</option>
                        <option>Moderada</option>
                        <option>Difícil</option>
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    )
}
