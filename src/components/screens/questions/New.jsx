import React from "react";

import { SteppedForm, Step } from "../../layout";
import { EnunciadoForm, AlternativesForm, FeaturesForm } from "./form";

export const New = () => {
  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <SteppedForm>
          <Step step={0}>
            <EnunciadoForm />
          </Step>
          <Step step={1}>
            <AlternativesForm />
          </Step>
          <Step step={2}>
            <FeaturesForm />
          </Step>
        </SteppedForm>
      </main>
    </div>
  );
};
