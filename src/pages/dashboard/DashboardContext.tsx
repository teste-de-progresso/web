import React, {
  createContext,
  useState,
  useMemo,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import {QuestionWhereInput} from '../../__generated__/graphql-schema'
import {useUserContext} from "../../contexts";

type ProviderValue = {
  where: QuestionWhereInput
  setWhere: Dispatch<SetStateAction<QuestionWhereInput>>
}

const DashboardContext = createContext<ProviderValue | null>(null)

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)

  if (context === null) {
    throw new Error('You probably forgot to put <DashboardProvider>.')
  }

  return context
}

export const DashboardProvider: FC = ({children}) => {
  const {user, isOnlyTeacher} = useUserContext()
  const [where, setWhere] = useState<QuestionWhereInput>(isOnlyTeacher ? {userId: user?.id} : {})
  const providerValue = useMemo(() => ({where, setWhere}), [
    where,
    setWhere,
  ])

  return (
    <DashboardContext.Provider value={providerValue}>
      {children}
    </DashboardContext.Provider>
  )
}
