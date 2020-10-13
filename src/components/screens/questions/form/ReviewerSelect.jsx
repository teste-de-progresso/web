import React, { useContext } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

import { FormContext } from "../../../layout/SteppedForm";

const GET_REVIEWER = gql`
  query {
    reviewers {
      id
      name
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
      label: item.name,
    };
  });

  const defaultValue = reviewers.find((item) => {
    return item.value === reviewerId;
  });

  return (
    <Controller
      control={formContext.control}
      name="reviewerId"
      render={({ onChange }) => (
        <Select
          placeholder="..."
          className="w-full"
          classNamePrefix="select"
          defaultValue={defaultValue}
          isLoading={loading}
          isClearable={true}
          isSearchable={true}
          onChange={(e) => {
            onChange(e?.value);
          }}
          name="color"
          options={reviewers}
        />
      )}
    />
  );
};
