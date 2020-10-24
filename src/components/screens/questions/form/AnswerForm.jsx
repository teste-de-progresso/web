import React from "react";
import { Card } from "../../../widgets/Card";
import { TextEditor } from "./TextEditor";

export const AnswerForm = ({ questionData }) => {
  const explanation = questionData?.explanation;
  const references = questionData?.references;

  const alternatives = questionData?.alternatives || [
    { text: "", correct: true },
  ];

  const correctAlternative = alternatives.find(
    (alternative) => alternative.correct === true
  );

  return (
    <>
      <Card title="Resposta Correta" className="mb-3">
        <div className="flex flex-col">
          <div className="w-full">
            <TextEditor
              name={"correctAlternative"}
              defaultValue={correctAlternative?.text || ""}
            />
          </div>
          <div className="flex flex-col w-full border border-gray-300 rounded p-4 mt-4 shadow-sm">
            <div>
              <h2 className="text-xl font-medium">Explicação</h2>
              <TextEditor name="explanation" defaultValue={explanation} />
            </div>
            <div>
              <h2 className="text-xl font-medium">Referências</h2>
              <TextEditor defaultValue={references || ""} name="references" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
