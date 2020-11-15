import React from "react";

import { SteppedForm, Step, Navigator } from "../../../components";
import {
  EnunciadoForm,
  AnswerForm,
  DistractorsForm,
  FeaturesForm,
} from "../Edit/From";

const initialQuestionData = {
  authorshipYear: "",
  body: "",
  explanation: "",
  instruction: "",
  references: "",
  source: "",
  status: "draft",
  support: "",
  alternatives: [
    {
      correct: true,
      text: "",
    },
    {
      correct: false,
      text: "",
    },
    {
      correct: false,
      text: "",
    },
    {
      correct: false,
      text: "",
    },
    {
      correct: false,
      text: "",
    },
  ]
}

export const New = () => {
  return (
    <>
      <Navigator home={true} needsConfirmation={true} />
      <div className="bg-gray-100 w-full my-2">
        <main>
        <SteppedForm status={initialQuestionData.status}>
            <Step step={0}>
              <EnunciadoForm questionData={initialQuestionData} />
            </Step>
            <Step step={1}>
              <AnswerForm questionData={initialQuestionData} />
            </Step>
            <Step step={2}>
              <DistractorsForm questionData={initialQuestionData} />
            </Step>
            <Step step={3}>
              <FeaturesForm questionData={initialQuestionData} />
            </Step>
          </SteppedForm>
        </main>
      </div>
    </>
  );
};
