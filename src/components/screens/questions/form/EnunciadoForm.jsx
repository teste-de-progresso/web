import React, {useContext} from "react";
import {Card} from "../../../widgets/Card";
import {TextEditor} from "./TextEditor";
import {FormContext} from "../../../layout/SteppedForm";
import {Controller} from "react-hook-form";

export const EnunciadoForm = () => {
    const formContext = useContext(FormContext);

    return (
        <Card className="h-full" title={"Enunciado"}>
            <TextEditor name={"enunciado"} defaultValue={"TEST"}/>
        </Card>
    )
}
