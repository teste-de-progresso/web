import React, {FC, Fragment} from 'react'
import {Disclosure, Transition} from "@headlessui/react"
import {ChevronUpIcon, XIcon} from "@heroicons/react/outline"
import {useForm} from "react-hook-form"

import {QuestionWhereInput} from "../../__generated__/graphql-schema"
import {useDashboardContext, whereDefaultState} from "./DashboardContext"
import {useUserContext} from "../../contexts"
import {Button, Input} from "../../components"

type FilterBarForm = {
  fromOtherUsers?: boolean
  createDate: {
    startAt: string
    endAt: string
  }
}

const startDateISO8601Date = '2021-01-01'
const currentISO8601Date = new Date().toISOString().split('T')[0]

const formDefaultValues: FilterBarForm = {
  fromOtherUsers: false,
  createDate: {
    startAt: startDateISO8601Date,
    endAt: currentISO8601Date
  }
}

const mapFilter = (values: FilterBarForm, userId?: string): QuestionWhereInput => ({
  userId: values.fromOtherUsers ? undefined : userId,
  createDate: {
    startAt: values.createDate.startAt.length ? values.createDate.startAt : startDateISO8601Date,
    endAt: values.createDate.endAt.length ? values.createDate.endAt : currentISO8601Date,
  }
})

const FiltersForm: FC = () => {
  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: formDefaultValues,
  })
  const {setWhere} = useDashboardContext()
  const userContext = useUserContext()
  const {user, isOnlyTeacher} = userContext

  const onSubmit = (values: FilterBarForm) => {
    reset(getValues(), {
      isDirty: false
    })
    setWhere(mapFilter(values, user?.id))
  }

  const handleClean = () => {
    reset(formDefaultValues)
    setWhere(whereDefaultState(userContext))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex justify-between"}
    >
        <span>
          <label className={"pl-2 pt-2"}>Data de Criação</label>
          <div className={"grid grid-cols-2 gap-2 border p-2 m-2 rounded-md border-gray-300"}>
            <Input
              type="date"
              placeholder="createDate.startAt"
              ref={register({
                maxLength: 10,
                minLength: 10,
              })}
              name={"createDate.startAt"}
              label={"A Partir De"}
            />
            <Input
              type="date"
              placeholder="createDate.endAt"
              ref={register({
                maxLength: 10,
                minLength: 10,
              })}
              name={"createDate.endAt"}
              label={"Até"}
            />
          </div>
        </span>
      {!isOnlyTeacher && (
        <span className={"flex items-center"}>
            <label
              htmlFor={"fromOtherUsers"}
              children={"Apenas questões próprias?"}
              className={"mr-3"}
            />
            <input
              id={"fromOtherUsers"}
              type="checkbox"
              placeholder="fromOtherUsers"
              ref={register}
              name={"fromOtherUsers"}
            />
          </span>
      )}
      <div className={"grid grid-cols-2 gap-2 place-items-center"}>
        <div>
          <Button type={'tertiary'} onClick={handleClean}>
            <span className={"flex"}>
              <XIcon className={"w-5 h-5 text-gray-800"}/>
              Limpar filtro
            </span>
          </Button>
        </div>
        <div>
          <Button disabled={!formState.isDirty} type={'primary'} htmlType={"submit"} className={"w-full"}>
            Filtar
          </Button>
        </div>
      </div>
    </form>
  );
}

export const Filters: FC = () => (
  <Disclosure>
    {({open}) => (
      <div className="m-auto bg-white rounded-md shadow-sm hover:shadow transition-shadow duration-300">
        <Disclosure.Button as={Fragment}>
          <button className="flex p-2 w-full justify-between">
            <div className="grid place-items-center pl-4">
              Filtros
            </div>
            <div className={"pr-4"}>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-800`}
              />
            </div>
          </button>
        </Disclosure.Button>
        <Transition
          show={open}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className={"p-4"}>
            <FiltersForm/>
          </Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
)
