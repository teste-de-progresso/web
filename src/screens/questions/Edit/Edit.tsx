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
import {
  Query,
  Question,
  Status,
} from "../../../graphql/__generated__/graphql-schema";

const GET_QUESTION = gql`
  query($uuid: ID!) {
    question(uuid: $uuid) {
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
        id
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
`;

export const Edit = () => {
  const { id: uuid } = useParams<any>();
  const history = useHistory();
  const [question, setQuestion] = useState<Question>();
  const [pageSaved, setPageSaved] = useState(false);

  if (!uuid) history.push("/");

  const { loading } = useQuery<Query>(GET_QUESTION, {
    variables: {
      uuid: uuid,
    },
    onCompleted: ({ question }) => setQuestion(question as Question),
  });

  if (loading || !question) return null;

  return (
    <div>
      <Navigator home needsConfirmation={!pageSaved} />
      <div className="bg-gray-100 w-full my-2">
        <main>
          <SteppedForm
            questionId={question.id}
            status={question.status as Status}
            setPageSaved={setPageSaved}
          >
            <Step step={0}>
              <EnunciadoForm question={question} />
            </Step>
            <Step step={1}>
              <AnswerForm question={question} />
            </Step>
            <Step step={2}>
              <DistractorsForm question={question} />
            </Step>
            <Step step={3}>
              <FeaturesForm question={question} />
            </Step>
          </SteppedForm>
        </main>
      </div>
    </div>
  );
};
