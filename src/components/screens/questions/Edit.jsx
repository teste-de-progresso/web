import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { SteppedForm, Step } from "../../layout";
import { EnunciadoForm, AlternativesForm, FeaturesForm } from "./form";

export const Edit = () => {
  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  const GET_QUESTION = gql`
    query {
      objectiveQuestion(id: ${id}) {
        id
        own
        authorshipYear
        body
        difficulty
        explanation
        source
        bloomTaxonomy
        references
        checkType
        subject {
          id
          name
        }
        alternatives {
          correct
          text
        }
      }
    }
  `;

  const { loading, data } = useQuery(GET_QUESTION);
  const questionData = data?.objectiveQuestion;

  if (loading || !questionData) return null;

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
              references={questionData.references}
            />
          </Step>
          <Step step={2}>
            <FeaturesForm
              own={questionData.own}
              source={questionData.source}
              authorshipYear={questionData.authorshipYear}
              difficulty={questionData.difficulty}
              bloomTaxonomy={questionData.bloomTaxonomy}
              checkType={questionData.checkType}
              subject={questionData.subject}
            />
          </Step>
        </SteppedForm>
      </main>
    </div>
  );
};
