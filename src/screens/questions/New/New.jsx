import React from "react";

import { SteppedForm, Step } from "../../../components";
import {
  EnunciadoForm,
  AnswerForm,
  DistractorsForm,
  FeaturesForm,
} from "../Edit/From";

const questionAlternativeSchema = (state) => ({
  text: "",
  correct: state,
});

const questionSchema = {
  body: "",
  alternatives: [
    questionAlternativeSchema(false),
    questionAlternativeSchema(false),
    questionAlternativeSchema(false),
    questionAlternativeSchema(false),
    questionAlternativeSchema(true),
  ],
  status: "draft",
  introduction: "",
  explanation: "",
  difficulty: "",
  bloomTaxonomy: "",
  source: "",
  own: true,
  references: "",
  subject: { id: undefined },
  reviewer: { id: undefined },
  instruction: "",
  support: "",
};

export const New = () => {
  console.log(questionSchema);
  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <SteppedForm>
          <Step step={0}>
            <EnunciadoForm questionData={questionSchema} />
          </Step>
          <Step step={1}>
            <AnswerForm questionData={questionSchema} />
          </Step>
          <Step step={2}>
            <DistractorsForm questionData={questionSchema} />
          </Step>
          <Step step={3}>
            <FeaturesForm questionData={questionSchema} />
          </Step>
        </SteppedForm>
      </main>
    </div>
  );
};
