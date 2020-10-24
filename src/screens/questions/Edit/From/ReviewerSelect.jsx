import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import { FormContext } from "../../../../components";

const GET_REVIEWER = gql`
  query {
    reviewers {
      id
      name
      email
    }
  }
`;

export const ReviewerSelect = ({ reviewerId }) => {
  const formContext = useContext(FormContext);

  const { loading, data } = useQuery(GET_REVIEWER);

  if (loading) return null;

  const reviewers = data.reviewers.map((item) => {
    return {
      value: item.id,
      label: item.name || item.email,
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