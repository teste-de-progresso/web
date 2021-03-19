import React, { FC } from "react";
import { useForm } from "react-hook-form";

import { BloomTaxonomy, Check, Difficulty } from "../../graphql/__generated__/graphql-schema";
import {
  CHECK_TYPE,
  BLOOM_TAXONOMY,
  DIFFICULTY,
} from "../../utils/types";

import { Button, Dialog, DialogButton, DialogContent } from "../../components";
import { useFiltersProvider } from './QuestionsFilterProvider'

type FilterGroupProps = {
  title: string
  register: any
  options: {
    value: string
    label: string
  }[]
  selecteds: any[]
}

const FilterGroup: FC<FilterGroupProps> = ({
  title,
  options,
  register,
  selecteds,
}) => (
  <div className="flex flex-col" key={`filter-group-${title}`}>
    <h3 className="font-bold mb-2">{title}</h3>
    {options.map(({ value, label }) => (
      <span key={value}>
        <input
          type="checkbox"
          name={value}
          ref={register}
          id={value}
          defaultChecked={selecteds.includes(value)}
        />
        <label htmlFor={value} className="ml-2">
          {label}
        </label>
      </span>
    ))}
  </div>
)


type Props = {
  open: boolean
  onClose: () => void
}

export const QuestionsFilter: FC<Props> = ({
  open,
  onClose,
}) => {
  const { handleSubmit, register } = useForm();
  const { where, setWhere } = useFiltersProvider()
  const { difficulty, checkType, bloomTaxonomy } = where

  const onSubmit = (inputs: any) => {
    const valuesFromCheckType = CHECK_TYPE.filter(({ value }) => inputs[value]).map(({ value }) => value) as Check[]
    const valuesFromBloomTaxonomy = BLOOM_TAXONOMY.filter(({ value }) => inputs[value]).map(({ value }) => value) as BloomTaxonomy[]
    const valuesFromDifficulty = DIFFICULTY.filter(({ value }) => inputs[value]).map(({ value }) => value) as Difficulty[]

    const removeKeysWithUndefiend = (obj: any) => {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj
    }

    setWhere(
      removeKeysWithUndefiend({
        checkType: (valuesFromCheckType.length ? valuesFromCheckType : undefined),
        bloomTaxonomy: (valuesFromBloomTaxonomy.length ? valuesFromBloomTaxonomy : undefined),
        difficulty: (valuesFromDifficulty.length ? valuesFromDifficulty : undefined),
      })
    )
    onClose()
  };

  const handleClean = () => {
    setWhere({})
  };

  if (!open) return null

  return (
    <Dialog
      title="Filtros"
      onClose={onClose}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <FilterGroup
              title="Tipo de Questão"
              register={register}
              options={CHECK_TYPE}
              selecteds={(checkType ?? []) as Check[]}
            />
            <FilterGroup
              title="Habilidade Cognitiva"
              register={register}
              options={BLOOM_TAXONOMY}
              selecteds={(bloomTaxonomy ?? []) as BloomTaxonomy[]}
            />
            <FilterGroup
              title="Dificuldade"
              register={register}
              options={DIFFICULTY}
              selecteds={(difficulty ?? []) as Difficulty[]}
            />
          </div>
        </DialogContent>

        <DialogButton>
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
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            className="mx-3"
            type="submit"
          >
            Aplicar
          </Button>
        </DialogButton>
      </form>
    </Dialog>
  );
};
