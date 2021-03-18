import React, { FC } from "react";
import { Card } from "../../../../components";
import { Question } from "../../../../graphql/__generated__/graphql-schema";
import { TextEditor } from "./TextEditor";

type Props = {
  question?: Question
}

export const EnunciadoForm: FC<Props> = ({ question }) => {
  return (
    <>
      <Card className="h-full mb-3" title="Instrução (opcional)">
        <TextEditor name="instruction" defaultValue={question?.instruction ?? ""} />
      </Card>
      <Card className="h-full mb-3" title="Suporte (opcional)">
        <TextEditor name="support" defaultValue={question?.support ?? ""} />
      </Card>
      <Card className="h-full mb-3" title="Enunciado">
        <TextEditor name="body" defaultValue={question?.body ?? ""} />
      </Card>
    </>
  );
};
