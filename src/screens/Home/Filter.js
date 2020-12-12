import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DialogContent, DialogActions } from "@material-ui/core";

import {
  CHECK_TYPE,
  BLOOM_TAXONOMY,
  DIFFICULTY,
} from "../../utils";
import { Button } from "../../components";

export const Filter = ({
  setCheckType,
  setBloomTaxonomy,
  setDifficulty,
  closeCallback,
  allSelectedKeys,
}) => {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const {
    handleSubmit, register, reset, setValue,
  } = useForm();

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
    filterGroups.forEach(({ group }) => {
      group.forEach(({ value }) => { setValue(value, false); });
    });

    setEnableSubmit(true);
  };

  const onSubmit = (inputs) => {
    filterGroups.forEach(({ callback, group }) => {
      const items = group
        .filter((item) => inputs[item.value])
        .map((item) => item.value);

      callback(items);
    });

    closeCallback();
  };

  const isSelected = (key) => allSelectedKeys.includes(key);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <div className="grid grid-cols-1 gap-10 mb-8 lg:grid-cols-2">
          {filterGroups.map(({ group, title }) => (
            <div className="flex flex-col" key={title}>
              <h3 className="font-bold mb-2">{title}</h3>
              {group.map(({ value, label }) => (
                <span key={value} onClick={() => setEnableSubmit(true)}>
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
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className="mx-3 gray-100"
          secondary
          onClick={() => handleClean()}
        >
          Limpar filtros
        </Button>
        <Button
          className="mx-3 gray-100"
          secondary
          onClick={() => handleUndo()}
        >
          Cancelar
        </Button>
        <Button
          className="mx-3"
          type="submit"
          style={{ opacity: enableSubmit ? "1" : "0" }}
          disabled={!enableSubmit}
        >
          Aplicar filtros
        </Button>
      </DialogActions>
    </form>
  );
};
