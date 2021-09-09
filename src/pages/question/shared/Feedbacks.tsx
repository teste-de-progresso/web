import React, { FC } from "react";
import { gql } from "@apollo/client";
import {
  AnnotationIcon,
  CheckCircleIcon,
  DocumentRemoveIcon,
} from '@heroicons/react/outline'

import { Card, Disclosures } from "../../../components";
import { ReviewMessage, ReviewMessageConnection } from "../../../__generated__/graphql-schema";

const feedbackIcon = {
  comment: <AnnotationIcon className="w-5" />,
  approve: <CheckCircleIcon className="w-5 text-green-800" />,
  request_changes: <DocumentRemoveIcon className="w-5 text-red-800" />,
};

const FeedbackTitle: FC<{
  feedback: ReviewMessage
}> = ({ feedback }) => (
  <p>
    {feedback.user.name}{' '} - {' '}
    <span className="text-gray-700">
      {new Date(feedback.createdAt).toLocaleString()}
    </span>
  </p>
)

export const FeedbacksFragments = gql`
  fragment ReviewMessagesFields on ReviewMessage {
    id
    feedbackType
    comment
    user {
      name
      avatarUrl
    }
    createdAt
  }
`

type Porps = {
  feedbacks: ReviewMessageConnection
}

export const Feedbacks: FC<Porps> = ({ feedbacks }) => (
  <Card title="Histórico de Pareceres">
    <Disclosures
      items={feedbacks.nodes.map((item) => ({
        title: <FeedbackTitle feedback={item} />,
        body: item.text ?? '',
        icon: feedbackIcon[item.feedbackType]
      }))}
    />
  </Card>
);
