import React from "react";
import { useForm } from "react-hook-form";

import {
  CHECK_TYPE,
  BLOOM_TAXONOMY,
  DIFFICULTY,
  STATUS,
} from "../../utils/types";
import { Button } from "../../widgets";

export const Filter = ({
  setCheckType,
  setBloomTaxonomy,
  setDifficulty,
  setStatus,
  closeCallback,
  allSelectedKeys,
}) => {
  const { handleSubmit, register, reset } = useForm();

  const filterGroups = [
    { callback: setCheckType, group: CHECK_TYPE, title: "Tipo de marcação" },
    {
      callback: setBloomTaxonomy,
      group: BLOOM_TAXONOMY,
      title: "Taxonomia de Bloom",
    },
    { callback: setDifficulty, group: DIFFICULTY, title: "Dificuldade" },
    { callback: setStatus, group: STATUS, title: "Status" },
  ];

  const handleUndo = () => {
    reset();

    closeCallback();
  };

  const handleClean = () => {
    filterGroups.forEach(({ callback }) => {
      callback([]);
    });

    closeCallback();
  };

  const onSubmit = (inputs) => {
    filterGroups.forEach(({ callback, group }) => {
      const items = group
        .filter((item) => {
          return inputs[item.key];
        })
        .map((item) => {
          return item.key;
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
              {group.map(({ key, value }, index) => {
                return (
                  <span key={index}>
                    <input
                      type="checkbox"
                      name={key}
                      ref={register}
                      id={key}
                      defaultChecked={isSelected(key)}
                    />
                    <label htmlFor={key} className="ml-2">
                      {value}
                    </label>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row-reverse">
        <Button className="mx-3" type="submit">
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
