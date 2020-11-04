import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { Input, FormContext } from "../../../../components";

const GET_SUBJECTS = gql`
  query {
    subjects {
      id
      name
    }
  }
`;

export const SubjectSelect = ({ subject }) => {
  const formContext = useContext(FormContext);
  const { loading, data } = useQuery(GET_SUBJECTS);

  if (loading) return null;

  const { id: subjectId } = subject

  const subjects = data.subjects.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2>Assunto:</h2>
        <select
          ref={formContext.register}
          className="w-full rounded p-1 border-gray-400 border shadow-sm"
          name="subjectId"
          defaultValue={subjectId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option></option>
          {subjects.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>

      <span className="mt-4">
        Eixo:
        <Input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          disabled={true}
        />
      </span>
      <span className="mt-4">
        Categoria:
        <Input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          disabled={true}
        />
      </span>
    </div>
  );
};
