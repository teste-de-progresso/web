import React, { FC, useContext } from 'react'
import { Control, FieldValues } from 'react-hook-form';
import { Question } from '../../../__generated__/graphql-schema';

type FormContextHooks = {
  register: any
  setValue: Function
  control: Control<FieldValues>
}

type FormContextProps = {
  hooks: FormContextHooks
  question?: Question
}

const FormContext = React.createContext<FormContextProps | null>(null);

export const useFormProvider = () => {
  const context = useContext(FormContext)

  if (context === null) {
    throw new Error('You probably forgot to put <FormProvider>.')
  }

  return context
}

type Props = {
  children?: any
  props: FormContextProps
}

export const FormProvider: FC<Props> = ({ children, props }) => {
  return (
    <FormContext.Provider value={props}>
      {children}
    </FormContext.Provider>
  )
}
