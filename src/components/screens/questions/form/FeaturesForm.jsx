import React from "react";
import {Card} from "../../../widgets/Card";

export const FeaturesForm = () => {
    return (
        <Card title={"Características"}>
            <div className="flex flex-col space-y-4">
                <div className={"flex space-x-2"}>
                    <div className="w-full">
                        <h4>Autoria</h4>
                        <select className="w-full bg-gray-100 rounded p-2 shadow-sm border border-gray-200">
                            <option selected={true}>Própria</option>
                            <option>Terceiros</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <h4>Autoria</h4>
                        <select className="w-full bg-gray-100 rounded p-2 shadow-sm border border-gray-200">

                        </select>
                    </div>
                </div>
                <div className={"border bg-white border-gray-300 rounded shadow-sm"}>
                    <div className="p-4 flex space-x-2">
                        <div className="w-full">
                            <h4>Referência</h4>
                            <select className="w-full bg-gray-100 rounded p-2 shadow-sm border border-gray-200">
                                <option selected={true}>Própria</option>
                                <option>Terceiros</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <h4>Ano</h4>
                            <select className="w-full bg-gray-100 rounded p-2 shadow-sm border border-gray-200">

                            </select>
                        </div>
                    </div>
                </div>
                <div className={"flex space-x-2"}>
                    <div className="w-full">
                        <h4>Taxonomia de Bloom</h4>
                        <select className="w-full bg-gray-100 rounded p-2 shadow-sm border border-gray-200">
                            <option selected={true}>Própria</option>
                            <option>Terceiros</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <h4>Dificuldade</h4>
                        <select className="w-full bg-gray-100 rounded p-2 shadow-sm border border-gray-200">

                        </select>
                    </div>
                </div>
            </div>
        </Card>
    )
}
