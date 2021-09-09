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

const ReviewMessageTitle: FC<{
  feedback: ReviewMessage
}> = ({ feedback }) => (
  <p>
    {feedback.user.name}{' '} - {' '}
    <span className="text-gray-700">
      {new Date(feedback.createdAt).toLocaleString()}
    </span>
  </p>
)

export const ReviewMessagesFragments = gql`
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
  messages: ReviewMessageConnection
}

export const ReviewMessages: FC<Porps> = ({ messages }) => (
  <Card title="Histórico de Pareceres">
    <Disclosures
      items={messages.nodes.map((item) => ({
        title: <ReviewMessageTitle feedback={item} />,
        body: item.text ?? '',
        icon: feedbackIcon[item.feedbackType]
      }))}
    />
  </Card>
);
