import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { SteppedForm, Step, Navigator } from "../../../components";
import {
  EnunciadoForm,
  AnswerForm,
  DistractorsForm,
  FeaturesForm,
} from "./From";
import { Query, Question, Status } from "../../../graphql/__generated__/graphql-schema";

const GET_QUESTION = gql`
  query ($uuid: ID!) {
    question (uuid: $uuid) {
      id
      uuid
      instruction
      support
      body
      alternatives {
        correct
        text
      }
      explanation
      references
      source
      authorshipYear
      difficulty
      checkType
      bloomTaxonomy
      subject {
        name
        axis {
          name
        }
        category {
          name
        }
      }
      status
      reviewer {
        id
        name
      }
      reviewFeedbacks {
        id
        status
        comment
        user {
          name
          avatarUrl
        }
      }
      updatedAt
      createdAt
    }
  }
`

export const Edit = () => {
  const { id: uuid } = useParams<any>()
  const history = useHistory()
  const [question, setQuestion] = useState<Question>()
  if (!uuid) history.push("/")

  const { loading } = useQuery<Query>(GET_QUESTION, {
    variables: {
      uuid: uuid,
    },
    onCompleted: ({ question }) => setQuestion(question as Question),
  });

  if (loading || !question) return null;


  return (
    <div>
      <Navigator home needsConfirmation />
      <div className="bg-gray-100 w-full my-2">
        <main>
          <SteppedForm questionId={question.id} status={question.status as Status}>
            <Step step={0}>
              <EnunciadoForm questionData={question} />
            </Step>
            <Step step={1}>
              <AnswerForm questionData={question} />
            </Step>
            <Step step={2}>
              <DistractorsForm questionData={question} />
            </Step>
            <Step step={3}>
              <FeaturesForm questionData={question} />
            </Step>
          </SteppedForm>
        </main>
      </div>
    </div>
  );
};
