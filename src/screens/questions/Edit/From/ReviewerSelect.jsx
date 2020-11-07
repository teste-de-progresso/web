import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { FormContext } from "../../../../components";

export const ReviewerSelect = ({ reviewer = {} }) => {
  const GET_REVIEWERS = loader("../../../../graphql/query/getReviewers.gql")
  const formContext = useContext(FormContext);

  const { loading, data } = useQuery(GET_REVIEWERS);

  if (loading) return null;

  const reviewerId = reviewer?.id

  const reviewers = data.reviewers.map(({ id, name, email }) => {
    return {
      value: id,
      label: `${name || ""} (${email})`,
    };
  });

  return (
    <select
      ref={formContext.register}
      className="w-full rounded p-1 border-gray-400 border shadow-sm"
      name="reviewerId"
      defaultValue={reviewerId}
    >
      <option></option>
      {reviewers.map((item, index) => {
        return (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};
