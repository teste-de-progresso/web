import React, { useContext, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

import { Input } from "../../../widgets";
import { FormContext } from "../../../layout/SteppedForm";

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

  const defaultValue = (() => {
    if (!selectedSubject) return undefined;

    return {
      value: selectedSubject.id,
      label: selectedSubject.name,
    };
  })();

  const axis = selectedSubject?.axis;
  const subCategory = axis?.subCategory;
  const category = subCategory?.category;

  const categorySlug = `${category?.name} > ${subCategory?.name}`;

  return (
    <div className="flex flex-col justify-between h-full">
      <h2>Assunto</h2>
      <Controller
        control={formContext.control}
        name="subjectId"
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
              setSelectedId(e?.value);
            }}
            name="color"
            options={subjects}
          />
        )}
      />

      <span>
        Eixo:
        <Input
          className="block rounded p-1 w-full border-gray-400 border shadow-sm"
          defaultValue={axis?.name}
          disabled={true}
        />
      </span>
      <span>
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
