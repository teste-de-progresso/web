import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { Input, FormContext } from "../../../../components";

export const SubjectSelect = ({ subject }) => {
  const GET_SUBJECTS = loader("../../../../graphql/query/getSubjects.gql");
  const { id: subjectId } = subject;
  const [selectedId, setSelectedId] = useState(subjectId);
  const formContext = useContext(FormContext);
  const { loading, data } = useQuery(GET_SUBJECTS);

  if (loading) return null;

  const subjects = data.subjects.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const selectedSubject = (() => {
    if (!selectedId || selectedId === "") {
      return {
        name: "",
        axis: {
          name: "",
        },
        category: {
          name: "",
        },
      };
    }

    return data.subjects.find((item) => item.id === selectedId);
  })();

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2>Assunto:</h2>
        <select
          ref={formContext.register}
          className="w-full rounded p-1 border-gray-400 border shadow-sm"
          name="subjectId"
          defaultValue={selectedSubject.id}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="" />
          {subjects.map(({ label, value }) => (
            <option key={`${label}-${value}`} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <span className="mt-4">
        Eixo:
        <Input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          disabled
          value={selectedSubject.axis.name}
        />
      </span>
      <span className="mt-4">
        Categoria:
        <Input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          disabled
          value={selectedSubject.category.name}
        />
      </span>
    </div>
  );
};
