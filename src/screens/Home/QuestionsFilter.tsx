import React, { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { DialogContent, DialogActions, DialogTitle } from "@material-ui/core";

import {
  CHECK_TYPE,
  BLOOM_TAXONOMY,
  DIFFICULTY,
} from "../../utils/types";
import { Button } from "../../components";

import { BloomTaxonomy, Check, Difficulty } from "../../graphql/__generated__/graphql-schema";

type FilterGroupProps = {
  title: string
  register: any
  options: {
    value: string
    label: string
  }[]
}

const FilterGroup: FC<FilterGroupProps> = ({ title, options, register }) => (
  <div className="flex flex-col" key={`filter-group-${title}`}>
    <h3 className="font-bold mb-2">{title}</h3>
    {options.map(({ value, label }) => (
      <span key={value}>
        <input
          type="checkbox"
          name={value}
          ref={register}
          id={value}
        />
        <label htmlFor={value} className="ml-2">
          {label}
        </label>
      </span>
    ))}
  </div>
)

type Props = {
  setCheckType: Dispatch<SetStateAction<Check[] | undefined>>
  setBloomTaxonomy: Dispatch<SetStateAction<BloomTaxonomy[] | undefined>>
  setDifficulty: Dispatch<SetStateAction<Difficulty[] | undefined>>
  hiddenModal: () => void
}

export const QuestionsFilter: FC<Props> = ({
  setCheckType,
  setBloomTaxonomy,
  setDifficulty,
  hiddenModal,
}) => {
  const {
    handleSubmit, register, reset, setValue
  } = useForm();
  const filterGroups = [
    { callback: setCheckType, options: CHECK_TYPE, title: "Tipo de Questão" },
    {
      callback: setBloomTaxonomy,
      options: BLOOM_TAXONOMY,
      title: "Habilidade Cognitiva",
    },
    { callback: setDifficulty, options: DIFFICULTY, title: "Dificuldade" },
  ];

  const onSubmit = (inputs: any) => {
    const valuesFromCheckType = CHECK_TYPE.filter(({ value }) => inputs[value]).map(({ value }) => value) as Check[]
    const valuesFromBloomTaxonomy = BLOOM_TAXONOMY.filter(({ value }) => inputs[value]).map(({ value }) => value) as BloomTaxonomy[]
    const valuesFromDifficulty = DIFFICULTY.filter(({ value }) => inputs[value]).map(({ value }) => value) as Difficulty[]

    setCheckType(valuesFromCheckType.length ? valuesFromCheckType : undefined)
    setBloomTaxonomy(valuesFromBloomTaxonomy.length ? valuesFromBloomTaxonomy : undefined)
    setDifficulty(valuesFromDifficulty.length ? valuesFromDifficulty : undefined)

    hiddenModal()
  };

  const handleUndo = () => {
    reset();

    hiddenModal();
  };

  const handleClean = () => {
    filterGroups.forEach(({ options }) => {
      options.forEach(({ value }) => {
        setValue(value, false)
      })
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        Filtros
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-1 gap-10 mb-8 lg:grid-cols-2">
          {filterGroups.map(({ title, callback, options }) => (
            <FilterGroup key={`fitler-group-${title}`} title={title} register={register} options={options} />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className="mx-3 gray-100"
          secondary
          onClick={() => handleClean()}
        >
          Limpar
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
        >
          Aplicar
        </Button>
      </DialogActions>
    </form>
  );
};
