import React, { FC, useState } from 'react'

import { PageInfo, Query, Question, QuestionWhereInput, Status } from '../../graphql/__generated__/graphql-schema';
import { gql, useQuery } from '@apollo/client';
import { QuestionsList } from './QuestionsList'
import { useAuth } from '../../utils/contexts';

const QUESTIONS_QUERY = gql`
  query QuestionsQuery($first: Int!, $after: String, $before: String, $where: QuestionWhereInput) {
    questions (
        first: $first,
        after: $after,
        before: $before,
        where: $where
    ) {
      nodes {
        id
        uuid
        userId
        updatedAt
        createdAt
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
const PAGE_SIZE = 4

type Props = {
  title: string
  where?: QuestionWhereInput
  status?: Status
}

export const QuestionsQuery: FC<Props> = ({ title, where, status }) => {
  const auth = useAuth()

  const [questions, setQuestions] = useState<Question[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>()

  const updateQuestions = (queryResult: Query) => {
    const { questions: questionConnection } = queryResult

    setQuestions(questionConnection.nodes as Question[])
    setPageInfo(questionConnection.pageInfo)
  }

  const whereInput = {
    status,
    userId: auth?.user?.user_id,
    ...where
  }

  const { fetchMore } = useQuery<Query>(QUESTIONS_QUERY, {
    onCompleted: (response) => {
      updateQuestions(response)
    },
    variables: {
      first: PAGE_SIZE,
      where: whereInput,
    },
  })

  const onNextPageClick = () => {
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: pageInfo?.endCursor,
      },
    }).then(({ data }) => {
      updateQuestions(data)
    })
  }

  const onPreviousPageClick = () => {
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        before: pageInfo?.startCursor,
      },
    }).then(({ data }) => {
      updateQuestions(data)
    })
  }

  return (
    <QuestionsList
      title={title}
      questions={questions}
      pagination={{
        onNextPageClick: onNextPageClick,
        hasNextPage: pageInfo?.hasNextPage ?? false,
        hasPreviousPage: pageInfo?.hasPreviousPage ?? false,
        onPreviousPageClick: onPreviousPageClick
      }}
    />
  )
};
