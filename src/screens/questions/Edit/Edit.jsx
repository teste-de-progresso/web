import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { SteppedForm, Step } from "../../../components";
import {
  EnunciadoForm,
  AnswerForm,
  DistractorsForm,
  FeaturesForm,
} from "./From";

export const Edit = () => {
  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  const GET_QUESTION = gql`
    query {
      objectiveQuestion(id: ${id}) {
        id
        instruction
        support
        body
        own
        authorshipYear
        difficulty
        explanation
        source
        bloomTaxonomy
        references
        checkType
        status
        reviewer {
          id
          name
        }
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

  if (loading) return null;

  const { objectiveQuestion: questionData } = data;

  if (!questionData) return null;

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <SteppedForm questionId={id} status={questionData.status}>
          <Step step={0}>
            <EnunciadoForm questionData={questionData} />
          </Step>
          <Step step={1}>
            <AnswerForm questionData={questionData} />
          </Step>
          <Step step={2}>
            <DistractorsForm questionData={questionData} />
          </Step>
          <Step step={3}>
            <FeaturesForm questionData={questionData} />
          </Step>
        </SteppedForm>
      </main>
    </div>
  );
};
