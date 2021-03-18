import React, { FC, useContext } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { FormContext } from "../../../../components";
import { Query, User } from "../../../../graphql/__generated__/graphql-schema";

type Props = {
  reviewer?: User

}
export const ReviewerSelect: FC<Props> = ({ reviewer }) => {
  const GET_REVIEWERS = loader("../../../../graphql/query/getReviewers.gql");
  const formContext = useContext(FormContext);
  const { loading, data } = useQuery<Query>(GET_REVIEWERS);

  if (loading || !reviewer) return null;

  const { id: reviewerId } = reviewer;
  const reviewers = data?.reviewers.map(({ id, name, email }) => ({
    value: id,
    label: `${name || ""} (${email})`,
  }));

  return (
    <select
      ref={formContext.register}
      className="w-full rounded p-1 border-gray-400 border shadow-sm"
      name="reviewerId"
      defaultValue={reviewerId}
    >
      <option />
      {reviewers?.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
