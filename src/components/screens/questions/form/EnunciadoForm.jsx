import React from "react";
import { Card } from "../../../widgets/Card";
import { TextEditor } from "./TextEditor";

export const EnunciadoForm = ({ instruction = "", support = "", body ="" }) => {
  return (
    <>
      <Card className="h-full mb-3" title="Instrução">
        <TextEditor name="instruction" defaultValue={instruction} />
      </Card>
      <Card className="h-full mb-3" title="Suporte">
        <TextEditor name="support" defaultValue={support} />
      </Card>
      <Card className="h-full mb-3" title="Enunciado">
        <TextEditor name="body" defaultValue={body} />
      </Card>
    </>
  );
};
