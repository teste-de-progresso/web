import React from "react";
import { Card } from "../../../widgets/Card";
import { TextEditor } from "./TextEditor";

export const EnunciadoForm = ({ value }) => {
  return (
    <Card className="h-full" title={"Enunciado"}>
      <TextEditor name="body" defaultValue={value || ""} />
    </Card>
  );
};
