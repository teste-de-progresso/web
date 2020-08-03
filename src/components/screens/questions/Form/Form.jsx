import React, { useState } from "react";
import { TextEditor } from "./TextEditor";
import { Button } from "../../../widgets/Button";
import { useForm } from "react-hook-form";

export const Form = (props) => {
  const { register, handleSubmit } = useForm();

  const [ckData, setCkData] = useState();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="bg-gray-100 py-4 px-8" onSubmit={handleSubmit(onSubmit)}>
      <input name="body" ref={register} value={ckData} hidden={true} />
      <TextEditor data={props.data} setCkData={setCkData} />

      <Button>Salvar</Button>
    </form>
  );
};
