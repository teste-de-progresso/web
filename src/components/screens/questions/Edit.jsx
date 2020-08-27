import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

import { SteppedForm } from "../../layout/SteppedForm";
import { Step } from "../../layout/Step";
import { EnunciadoForm } from "./form/EnunciadoForm";
import { AlternativesForm } from "./form/AlternativesForm";
import { FeaturesForm } from "./form/FeaturesForm";

export const Edit = () => {
  const { id } = useParams();

  const history = useHistory();

  if (!id) {
    history.push("/");
  }

  const GET_QUESTION = gql`
    query {
      getObjectiveQuestion(id: ${id}) {
        id
        own
        authorshipYear
        body
        difficulty
        explanation
        source
        bloomTaxonomy
        alternatives {
          correct
          text
        }
      }
    }
  `;

  const { loading, data } = useQuery(GET_QUESTION);

  if (loading || !data.getObjectiveQuestion) return null;

  const questionData = data.getObjectiveQuestion;

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <SteppedForm questionId={questionData.id}>
          <Step step={0}>
            <EnunciadoForm value={questionData.body} />
          </Step>
          <Step step={1}>
            <AlternativesForm
              alternatives={questionData.alternatives}
              explanation={questionData.explanation}
            />
          </Step>
          <Step step={2}>
            <FeaturesForm
              own={questionData.own}
              source={questionData.source}
              authorshipYear={questionData.authorshipYear}
              difficulty={questionData.difficulty}
              bloomTaxonomy={questionData.bloomTaxonomy}
            />
          </Step>
        </SteppedForm>
      </main>
    </div>
  );
};
