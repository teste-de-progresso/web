import React from "react";
import { Card } from "../../../widgets/Card";
import { TextEditor } from "./TextEditor";

export const AlternativesForm = ({ alternatives = [], explanation }) => {
  const correctAlternative = alternatives.find(
    (alternative) => alternative.correct === true
  );
  const incorrectAnswers = alternatives.filter(
    (alternative) => alternative.correct === false
  );

  return (
    <>
      <Card title={"Alternativa correta"} className="mb-3">
        <div className={"border border-gray-300 rounded p-4 mt-4 shadow-sm"}>
          <div className="flex space-x-4">
            <div className="w-full">
              <h2 className="text-xl font-medium">Alternativa Correta</h2>
              <TextEditor
                name={"correctAlternative"}
                defaultValue={correctAlternative?.text || ""}
              />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <div>
                <h2 className="text-xl font-medium">Explicação</h2>
                <TextEditor
                  name={"correctAlternativeExplanation"}
                  defaultValue={explanation}
                />
              </div>
              <div>
                <h2 className="text-xl font-medium">Referências da explicação</h2>
                <TextEditor name={"correctAlternativeExplanationReference"} />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card title={"Alternativas incorretas"}>
        <div className={"border border-gray-300 rounded p-4 mt-4 shadow-sm"}>
          <h2 className="text-xl font-medium">Alternativas Incorretas</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="w-full">
                <TextEditor
                  name={"incorrectAlternative1"}
                  defaultValue={incorrectAnswers[0]?.text}
                />
              </div>
              <div className="w-full">
                <TextEditor
                  name={"incorrectAlternative2"}
                  defaultValue={incorrectAnswers[1]?.text}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-full">
                <TextEditor
                  name={"incorrectAlternative3"}
                  defaultValue={incorrectAnswers[2]?.text}
                />
              </div>
              <div className="w-full">
                <TextEditor
                  name={"incorrectAlternative4"}
                  defaultValue={incorrectAnswers[3]?.text}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
