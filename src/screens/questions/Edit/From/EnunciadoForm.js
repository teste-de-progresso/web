import React from "react";
import { Card } from "../../../../components";
import { TextEditor } from "./TextEditor";

export const EnunciadoForm = ({ questionData = {} }) => {
  const { instruction, support, body } = questionData;

  return (
    <>
      <Card className="h-full mb-3" title="Instrução (opcional)">
        <TextEditor name="instruction" defaultValue={instruction} />
      </Card>
      <Card className="h-full mb-3" title="Suporte (opcional)">
        <TextEditor name="support" defaultValue={support} />
      </Card>
      <Card className="h-full mb-3" title="Enunciado">
        <TextEditor name="body" defaultValue={body} />
      </Card>
    </>
  );
};
