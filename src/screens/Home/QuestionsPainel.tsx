import React, { FC } from 'react'

import { QuestionsQuery } from './QuestionsQuery'
import { QuestionsRevisedQuery } from './QuestionsRevisedQuery'
import { useFiltersProvider } from './QuestionFilter/QuestionsFilterProvider'
import { QuestionsWaitingReviewQuery } from './QuestionsWaitingReviewQuery'

export const QuestionsPainel: FC = () => {
  const { where } = useFiltersProvider()

  return (
    <>
      <QuestionsWaitingReviewQuery title="Aguardando seu Parecer" />
      <QuestionsQuery title="Em Revisão" where={where} status='pending' />
      <QuestionsQuery title="Rascunhos" where={where} status='draft' />
      <QuestionsQuery title="Registradas" where={where} status='finished' />
      <QuestionsQuery title="Aprovadas" where={where} status='approved' />
      <QuestionsRevisedQuery title="Revisadas Anteriormente" />
    </>
  )
}
