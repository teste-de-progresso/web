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
      <QuestionsQuery title="Em Revisão" where={where} status={QuestionStatus.Pending} />
      <QuestionsQuery title="Rascunhos" where={where} status={QuestionStatus.Draft} />
      <QuestionsQuery title="Registradas" where={where} status={QuestionStatus.Finished} />
      <QuestionsQuery title="Aprovadas" where={where} status={QuestionStatus.Approved} />
      <QuestionsRevisedQuery title="Revisadas Anteriormente" />
    </>
  )
}
