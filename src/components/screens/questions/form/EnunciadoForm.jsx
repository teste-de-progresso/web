import React, {useContext} from "react";
import {Card} from "../../../widgets/Card";
import {TextEditor} from "./TextEditor";

export const EnunciadoForm = () => {
    return (
        <Card className="h-full" title={"Enunciado"}>
            <TextEditor name={"enunciado"} defaultValue={"TEST"}/>
        </Card>
    )
}
