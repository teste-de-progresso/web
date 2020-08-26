import React from "react";
import { SteppedForm } from "../../layout/SteppedForm";
import { Step } from "../../layout/Step";
import { EnunciadoForm } from "./form/EnunciadoForm";
import { AlternativesForm } from "./form/AlternativesForm";
import { FeaturesForm } from "./form/FeaturesForm";

import { Navbar } from "../../layout/Navbar";
import { Footer } from "../../layout/Footer";

export const New = () => {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
};
