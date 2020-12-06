import React from "react";
import { Card } from "../../../../components";
import { TextEditor } from "./TextEditor";

export const DistractorsForm = ({ questionData = {} }) => {
  const { alternatives } = questionData;

  const incorrectAnswers = alternatives.filter(
    (alternative) => alternative.correct === false,
  );

  return (
    <>
      <Card title="Distratores">
        <div className="flex flex-col">
          <div className="">
            {incorrectAnswers.map(({ text }, index) => (
              <div className="w-full mb-3" key={index}>
                <TextEditor
                  name={`incorrectAlternative${index + 1}`}
                  defaultValue={text}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};
