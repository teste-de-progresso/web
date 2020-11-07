import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { Input, FormContext } from "../../../../components";

export const SubjectSelect = ({ subject = undefined }) => {
  const GET_SUBJECTS = loader("../../../../graphql/query/getSubjects.gql");
  const [selectedId, setSelectedId] = useState(subject?.id);
  const formContext = useContext(FormContext);
  const { loading, data } = useQuery(GET_SUBJECTS);

  if (loading) return null;

  const subjects = data.subjects.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const selectedSubject = (() => {
    if (!selectedId) return undefined;

    return data.subjects.find((item) => {
      return item.id === selectedId;
    });
  })();

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2>Assunto:</h2>
        <select
          ref={formContext.register}
          className="w-full rounded p-1 border-gray-400 border shadow-sm"
          name="subjectId"
          defaultValue={selectedId}
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
          value={selectedSubject?.axis?.name}
        />
      </span>
      <span className="mt-4">
        Categoria:
        <Input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          disabled={true}
          value={selectedSubject?.category?.name}
        />
      </span>
    </div>
  );
};
