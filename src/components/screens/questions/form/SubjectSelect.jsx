import React, { useContext } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

import { FormContext } from "../../../layout/SteppedForm";

const GET_SUBJECTS = gql`
  query {
    subjects {
      id
      name
    }
  }
`;

export const SubjectSelect = ({ defaultValue }) => {
  const formContext = useContext(FormContext);
  const { loading, data } = useQuery(GET_SUBJECTS);

  if (loading) return null;

  const subjects = data.subjects.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const defaultSuject = (() => {
    if (!defaultValue) return undefined;

    return [defaultValue].map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    })[0];
  })();

  return (
    <Controller
      control={formContext.control}
      name="subjectId"
      render={({ onChange }) => (
        <Select
          className="basic-single w-full"
          classNamePrefix="select"
          defaultValue={defaultSuject}
          isLoading={loading}
          isClearable={true}
          isSearchable={true}
          onChange={(e) => onChange(e.value)}
          name="color"
          options={subjects}
        />
      )}
    />
  );
};
