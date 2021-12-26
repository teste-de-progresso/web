import React, { FC } from 'react'

import { QuestionsQuery } from './QuestionsQuery'
import { QuestionsRevisedQuery } from './QuestionsRevisedQuery'
import { useFiltersProvider } from './QuestionFilter/QuestionsFilterProvider'
import { QuestionsWaitingReviewQuery } from './QuestionsWaitingReviewQuery'
import { QuestionStatus } from '../../../__generated__/graphql-schema'

export const QuestionsPainel: FC = () => {
  const { where } = useFiltersProvider()

  return (
    <>
      <QuestionsWaitingReviewQuery title="Aguardando seu Parecer" />
      <QuestionsQuery title="Aguardando Parecer do Revisor" where={where} status={QuestionStatus.Pending} />
      <QuestionsQuery title="Rascunhos" where={where} status={QuestionStatus.Draft} />
      <QuestionsQuery title="Aprovadas" where={where} status={QuestionStatus.Approved} />
      <QuestionsQuery title="Registradas" where={where} status={QuestionStatus.Registered} />
      <QuestionsRevisedQuery title="Revisadas por Você" />
    </>
  )
}
