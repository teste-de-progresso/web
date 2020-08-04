import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Button} from "../../../widgets/Button";
import {TextEditor} from "./TextEditor";
import {Alternatives} from "./Alternatives";
import {Card} from "../../../widgets/Card";
import styled from "styled-components";

export const Form = ({questionData}) => {
    const {register, handleSubmit} = useForm();

    const [ckData, setCkData] = useState();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form className="bg-gray-100 py-4 px-8 w-full" onSubmit={handleSubmit(onSubmit)}>
            <input name="body" ref={register} value={ckData} hidden={true}/>

            <div className="flex space-x-2">
                <div className={"flex-grow flex-shrink flex-grow-0"} style={{flexBasis: 500}}>
                    <Card title={"Enunciado"}>
                        <TextEditor data={questionData.body} setCkData={setCkData}/>
                    </Card>
                </div>
                <div className="flex flex-col space-y-4 flex-grow">
                    <Alternatives register={register}/>
                    <Button className="w-full">Salvar</Button>
                </div>
            </div>
        </form>
    );
};
