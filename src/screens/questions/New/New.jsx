import React from "react";

import { SteppedForm, Step } from "../../../components";
import {
  EnunciadoForm,
  AnswerForm,
  DistractorsForm,
  FeaturesForm,
} from "../Edit/From";

export const New = () => {
  return (
      <div className="bg-gray-100 h-full w-full">
      <main className="h-full">
        <SteppedForm>
          <Step step={0}>
            <EnunciadoForm />
          </Step>
          <Step step={1}>
            <AnswerForm />
          </Step>
          <Step step={2}>
            <DistractorsForm />
          </Step>
          <Step step={3}>
            <FeaturesForm />
          </Step>
        </SteppedForm>
      </main>
    </div>
  );
};
