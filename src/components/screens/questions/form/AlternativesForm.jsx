import React from "react";
import { Card } from "../../../widgets/Card";
import { TextEditor } from "./TextEditor";

export const AlternativesForm = ({
  alternatives = [],
  explanation,
  references,
}) => {
  const correctAlternative = alternatives.find(
    (alternative) => alternative.correct === true
  );

  const incorrectAnswers = alternatives.filter(
    (alternative) => alternative.correct === false
  );

  if (incorrectAnswers.length === 0) {
    for (const index = 0; index < 4; index++) {
      incorrectAnswers.push({ index: index + 1, text: "" });
    }
  }

  return (
    <>
      <Card title={"Alternativa correta"} className="mb-3">
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
              <TextEditor
                name={"correctAlternativeExplanation"}
                defaultValue={explanation}
              />
            </div>
            <div>
              <h2 className="text-xl font-medium">Referências</h2>
              <TextEditor
                defaultValue={references || ""}
                name={"correctAlternativeExplanationReference"}
              />
            </div>
          </div>
        </div>
      </Card>
      <Card title={"Alternativas incorretas"}>
        <div className="flex flex-col">
          <div className="">
            {incorrectAnswers.map((answer, index) => {
              return (
                <div className="w-full mb-3" key={index}>
                  <TextEditor
                    name={`incorrectAlternative${index + 1}`}
                    defaultValue={answer.text}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </>
  );
};
