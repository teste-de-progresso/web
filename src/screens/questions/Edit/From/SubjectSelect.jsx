import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { Input, FormContext } from "../../../../components";

const GET_SUBJECTS = gql`
  query {
    subjects {
      id
      name
      axis {
        name
        subCategory {
          name
          category {
            name
          }
        }
      }
    }
  }
`;

export const SubjectSelect = ({ subjectId }) => {
  const formContext = useContext(FormContext);
  const [selectedId, setSelectedId] = useState(subjectId);

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

  const axis = selectedSubject?.axis;
  const subCategory = axis?.subCategory;
  const category = subCategory?.category;

  const categorySlug = `${category?.name} > ${subCategory?.name}`;

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2>Assunto:</h2>
        <select
          ref={formContext.register}
          className="w-full rounded p-1 border-gray-400 border shadow-sm"
          name="subjectId"
          defaultValue={selectedSubject?.id}
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
          defaultValue={axis?.name}
          disabled={true}
        />
      </span>
      <span className="mt-4">
        Categoria:
        <Input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          defaultValue={category ? categorySlug : ""}
          disabled={true}
        />
      </span>
    </div>
  );
};
