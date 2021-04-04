import React, { FC } from "react";

import { Card } from "../../../../components";
import { TextEditor } from "../components/TextEditor";
import { useFormProvider } from '../FormContext'

export const DistractorsFormStep: FC = () => {
  const { question } = useFormProvider()

  const incorrectAnswers = question?.alternatives?.filter(
    (alternative) => alternative.correct === false,
  ) || [
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
    ];

  return (
    <>
      <Card title="Distratores">
        <div className="flex flex-col">
          <div className="">
            {incorrectAnswers.map(({ text }, index) => (
              <div className="w-full mb-3" key={index}>
                <TextEditor
                  name={`incorrectAlternative${index + 1}`}
                  defaultValue={text ?? ""}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};
