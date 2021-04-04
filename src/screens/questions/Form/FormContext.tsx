import React, { FC, useContext } from 'react'
import { Question } from '../../../graphql/__generated__/graphql-schema';

type FormContextProps = {
  register?: any
  control?: any
  setValue?: any
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
  formHooks: FormContextProps
}

export const FormProvider: FC<Props> = ({ children, formHooks }) => {
  return (
    <FormContext.Provider value={formHooks}>
      {children}
    </FormContext.Provider>
  )
}
