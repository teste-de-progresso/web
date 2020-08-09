import React from "react";
import {Card} from "../../../widgets/Card";
import {TextEditor} from "./TextEditor";

export const EnunciadoForm = () => {

    return (
        <Card className="h-full" title={"Enunciado"}>
            <TextEditor data={""} setCkData={() => {}}/>
        </Card>
    )
}
