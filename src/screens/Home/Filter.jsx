import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  CHECK_TYPE,
  BLOOM_TAXONOMY,
  DIFFICULTY,
} from "../../utils/types";
import { Button } from "../../components";

export const Filter = ({
  setCheckType,
  setBloomTaxonomy,
  setDifficulty,
  closeCallback,
  allSelectedKeys,
}) => {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  const filterGroups = [
    { callback: setCheckType, group: CHECK_TYPE, title: "Tipo de marcação" },
    {
      callback: setBloomTaxonomy,
      group: BLOOM_TAXONOMY,
      title: "Taxonomia de Bloom",
    },
    { callback: setDifficulty, group: DIFFICULTY, title: "Dificuldade" },
  ];

  const handleUndo = () => {
    reset();

    closeCallback();
  };

  const handleClean = () => {
    filterGroups.forEach(({ callback }) => {
      callback([]);
    });
  };

  const onSubmit = (inputs) => {
    filterGroups.forEach(({ callback, group }) => {
      const items = group
        .filter((item) => {
          return inputs[item.value];
        })
        .map((item) => {
          return item.value;
        });

      callback(items);
    });

    closeCallback();
  };

  const isSelected = (key) => {
    return allSelectedKeys.includes(key);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-10 mb-8 lg:grid-cols-2">
        {filterGroups.map(({ group, title }, index) => {
          return (
            <div className="flex flex-col" key={index}>
              <h3 className="font-bold mb-2">{title}</h3>
              {group.map(({ value, label }, index) => {
                return (
                  <span key={index} onClick={() => setEnableSubmit(true)}>
                    <input
                      type="checkbox"
                      name={value}
                      ref={register}
                      id={value}
                      defaultChecked={isSelected(value)}
                    />
                    <label htmlFor={value} className="ml-2">
                      {label}
                    </label>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row-reverse">
        <Button
          className="mx-3"
          type="submit"
          style={{ opacity: enableSubmit ? "1" : "0" }}
          disabled={!enableSubmit}
        >
          Aplicar filtros
        </Button>
        <Button
          className="mx-3 gray-100"
          secondary={true}
          onClick={() => handleUndo()}
        >
          Cancelar
        </Button>
        <Button
          className="mx-3 gray-100"
          secondary={true}
          onClick={() => handleClean()}
        >
          Limpar filtros
        </Button>
      </div>
    </form>
  );
};
