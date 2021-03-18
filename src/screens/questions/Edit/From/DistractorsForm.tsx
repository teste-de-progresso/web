import React, { FC } from "react";
import { Card } from "../../../../components";
import { Question } from "../../../../graphql/__generated__/graphql-schema";
import { TextEditor } from "./TextEditor";

type Props = {
  question?: Question
}

export const DistractorsForm: FC<Props> = ({ question }) => {
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
