import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../widgets/Button";
import { TextEditor } from "./TextEditor";
import { Alternatives } from "./Alternatives";

export const Form = ({ questionData }) => {
  const { register, handleSubmit } = useForm();

  const [ckData, setCkData] = useState();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="bg-gray-100 py-4 px-8" onSubmit={handleSubmit(onSubmit)}>
      <input name="body" ref={register} value={ckData} hidden={true} />
      <TextEditor data={questionData.body} setCkData={setCkData} />

      <Alternatives register={register}/>

      <Button>Salvar</Button>
    </form>
  );
};
