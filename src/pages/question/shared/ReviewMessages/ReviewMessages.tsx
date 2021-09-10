import React, { FC } from "react";
import { gql } from "@apollo/client";
import {
  AnnotationIcon,
  CheckCircleIcon,
  DocumentRemoveIcon,
} from '@heroicons/react/outline'

import { Card } from "../../../../components";
import { Question, ReviewMessage } from "../../../../__generated__/graphql-schema";
import { ReviewMessageForm, ReviewMessageFormFragments } from "./ReviewMessagesForm";

const feedbackIcon = {
  comment: <AnnotationIcon className="w-5" />,
  approve: <CheckCircleIcon className="w-5 text-green-800" />,
  request_changes: <DocumentRemoveIcon className="w-5 text-red-800" />,
};

const ReviewMessageTitle: FC<{
  feedback: ReviewMessage
}> = ({ feedback }) => (
  <p className="flex">
    {feedback.user.name}{' '} - {' '}
    <span className="text-gray-700 pr-2">
      {new Date(feedback.createdAt).toLocaleString()}
    </span>
    {feedbackIcon[feedback.feedbackType]}
  </p>
)

export const ReviewMessagesFragments = gql`
  ${ReviewMessageFormFragments}
  fragment ReviewMessages_question on Question {
    id
    ...ReviewMessageForm_question
    user {
      id
    }
    reviewMessages {
      nodes {
        id
        feedbackType
        text
        user {
          name
          avatarUrl
        }
        createdAt
      }
    }
  }
`

export const ReviewMessages: FC<{
  question: Question
}> = ({ question }) => {
  const reviewMessages = question.reviewMessages.nodes
  const hasFeebacks = !!reviewMessages.length

  return (
  <div>
    <Card className="mb-3" title="Histórico de Pareceres">
      {hasFeebacks
        ? reviewMessages.map((item) => (
          <div key={item.id}>
            <ReviewMessageTitle feedback={item}/>
            <p className="p-2">
              {item.text}
            </p>
          </div>
        ))
       : 'Essa questão não tem nenhum parecer ainda.'}
    </Card>
    <ReviewMessageForm question={question} />
  </div>
)};
