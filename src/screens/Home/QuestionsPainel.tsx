import React, { FC } from 'react'

import { QuestionsQuery } from './QuestionsQuery'
import { QuestionsWaitingQuery } from './QuestionsWaitingReviewQuery'
import { QuestionWhereInput } from '../../graphql/__generated__/graphql-schema'

type Props = {
  where?: QuestionWhereInput
}

export const QuestionsPainel: FC<Props> = ({ where }) => (
  <>
    <QuestionsWaitingQuery title="Aguardando sua revisão" />
    <QuestionsQuery title="Aguardando parecer do revisor" where={where} status='pending' />
    <QuestionsQuery title="Rascunhos" where={where} status='draft' />
    <QuestionsQuery title="Aprovadas" where={where} status='approved' />
    <QuestionsQuery title="Regristradas" where={where} status='finished' />
  </>
)
