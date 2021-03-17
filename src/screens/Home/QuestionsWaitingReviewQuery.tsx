import React, { FC, useState } from 'react'

import { PageInfo, Query, Question, ReviewRequest, User } from '../../graphql/__generated__/graphql-schema';
import { gql, useQuery } from '@apollo/client';
import { QuestionsList } from './QuestionsList'

const QUESTIONS_QUERY = gql`
  query QuestionsWaitingReviewQuery($first: Int!, $after: String) {
    currentUser {
      id
      activeReviewRequests(
        first: $first,
        after: $after
      ) {
        nodes {
          id
          question {
            id
            uuid
            userId
            updatedAt
            createdAt
          }
        }
      }
    }
  }
`
const PAGE_SIZE = 4

type Props = {
  title: string
}

export const QuestionsWaitingQuery: FC<Props> = ({ title }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>()

  const updateQuestions = (queryResult: Query) => {
    const { currentUser } = queryResult
    const { activeReviewRequests } = currentUser as User
    const reviewRequests = activeReviewRequests.nodes as ReviewRequest[]

    setQuestions(reviewRequests.map(item => item.question))
    setPageInfo(activeReviewRequests.pageInfo)
  }

  const { fetchMore } = useQuery<Query>(QUESTIONS_QUERY, {
    onCompleted: (response) => {
      updateQuestions(response)
    },
    variables: {
      first: PAGE_SIZE,
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