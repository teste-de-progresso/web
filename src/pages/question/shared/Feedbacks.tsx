import React, { FC } from "react";
import { gql } from "@apollo/client";
import {
  AnnotationIcon,
  CheckCircleIcon,
  DocumentRemoveIcon,
} from '@heroicons/react/outline'

import { Card, Disclosures } from "../../../components";
import { ReviewFeedback } from "../../../__generated__/graphql-schema";

const feedbackIcon = {
  comment: <AnnotationIcon className="w-5" />,
  approve: <CheckCircleIcon className="w-5 text-green-800" />,
  request_change: <DocumentRemoveIcon className="w-5 text-red-800" />,
};

type FeedbackTitleProps = {
  feedback: ReviewFeedback
}

const FeedbackTitle: FC<FeedbackTitleProps> = ({ feedback }) => (
  <p>
    {feedback.user.name}{' '} - {' '}
    <span className="text-gray-700">
      {new Date(feedback.createdAt).toLocaleString()}
    </span>
  </p>
)

export const FeedbacksFragments = gql`
  fragment FeedbackFields on ReviewFeedback {
    id
    status
    comment
    user {
      name
      avatarUrl
    }
    createdAt
  }
`

type Porps = {
  feedbacks: readonly ReviewFeedback[]
}

export const Feedbacks: FC<Porps> = ({ feedbacks }) => (
  <Card title="Histórico de Pareceres">
    <Disclosures
      items={feedbacks.map((item) => ({
        title: <FeedbackTitle feedback={item} />,
        body: item.comment ?? '',
        icon: feedbackIcon[item.status]
      }))}
    />
  </Card>
);
