import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../widgets/Button";
import {Avatar} from "../../layout/Avatar";

export const UserProfile = () => {
  const history = useHistory();


    return (
        <div className="bg-primary-normal h-full w-full">
            <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
                <div className="flex items-center flex-col">
                    <div className="bg-white shadow border border-gray-100 flex flex-col items-center rounded p-4 w-full max-w-4xl pb-4 mt-8">
                        <div className="relative w-full flex justify-center h-16">
                            <Avatar className="top-0 absolute" size={24} style={{top: '-3.25rem'}}/>
                        </div>
                        <h2 className="font-xl font-bold">Eugênio da Silva </h2>
                        <h2 className="font-xl py-4">Centro de Ciências Tecnológicas (CCT)</h2>
                        <h2 className="font-xl">Docente</h2>
                    </div>
                    <div className="pt-2 flex justify-end max-w-4xl w-full">
                        <Button className="">Editar dados</Button>
                    </div>
                </div>
            </main>
        </div>
    );
};
