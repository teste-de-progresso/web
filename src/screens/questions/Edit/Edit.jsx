import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { SteppedForm, Step, Navigator } from "../../../components";
import {
  EnunciadoForm,
  AnswerForm,
  DistractorsForm,
  FeaturesForm,
} from "./From";

export const Edit = () => {
  const GET_QUESTION = loader("../../../graphql/query/getQuestion.gql");
  const { id: questionId } = useParams();
  const history = useHistory();

  if (!questionId) history.push("/");

  const { loading, data } = useQuery(GET_QUESTION, {
    variables: {
      id: questionId,
    },
  });

  if (loading) return null;

  const { question: questionData } = data;

  return (
    <>
      <Navigator home needsConfirmation />
      <div className="bg-gray-100 w-full my-2">
        <main>
          <SteppedForm questionId={questionId} status={questionData.status}>
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
    </>
  );
};
