import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";

import { useFormProvider } from '../../FormContext'
import { Query, User } from "../../../../../graphql/__generated__/graphql-schema";

const REVIEWERS_QUERY = gql`
  query {
    reviewers {
      nodes {
        id
        name
        email
      }
    }
  }
`

type Props = {
  reviewer?: User

}

export const ReviewerSelect: FC<Props> = () => {
  const { register, question } = useFormProvider()
  const { loading, data } = useQuery<Query>(REVIEWERS_QUERY);

  if (loading) return null;

  const reviewers = data?.reviewers.nodes

  return (
    <select
      ref={register}
      className="w-full rounded p-1 border-gray-400 border shadow-sm"
      name="reviewerUserId"
      defaultValue={question?.reviewer?.id}
    >
      {(question?.status === undefined || question?.status === "draft") && <option />}
      {reviewers?.map((review, index) => (
        <option key={index} value={review?.id}>
          {review?.name}
        </option>
      ))}
    </select>
  );
};
