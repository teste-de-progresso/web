import React, { FC } from 'react'

import { QuestionsQuery } from './QuestionsQuery'
import { QuestionsWaitingQuery } from './QuestionsWaitingReviewQuery'
import { useFiltersProvider } from './QuestionsFilterProvider'

export const QuestionsPainel: FC = () => {
  const { where } = useFiltersProvider()

  return (
    <>
      <QuestionsWaitingQuery title="Aguardando seu Parecer" />
      <QuestionsQuery title="Em Revisão" where={where} status='pending' />
      <QuestionsQuery title="Rascunhos" where={where} status='draft' />
      <QuestionsQuery title="Aprovadas" where={where} status='approved' />
      <QuestionsQuery title="Registradas" where={where} status='finished' />
    </>
  )
}
