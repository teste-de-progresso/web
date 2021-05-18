import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Query } from '../../../__generated__/graphql-schema'
import { Pie } from '../components/charts'

type ResponsivePieData = {
  id: string
  label: string
  value: number
}[]

const SubjectsQuestionsTotalCountQuery = gql`
  query SubjectQuestionsTotalCountQuery {
    subjects {
      nodes {
        id
        name
        questions {
          totalCount
        }
      }
    }
  }
`

export const QuestionsBySubject: FC = () => {
  const { loading, data } = useQuery<Query>(SubjectsQuestionsTotalCountQuery)

  if (loading) return null

  const subjects = data?.subjects.nodes ?? []
  const subjectWithQuestions = subjects.filter(subject => !!subject?.questions.totalCount)
  const mappedData: ResponsivePieData = subjectWithQuestions.map(subject => {
    return ({
      id: subject?.name as string,
      label: subject?.name as string,
      value: subject?.questions.totalCount as number,
    })
  })
  const filteredData = mappedData.filter(item => item.value)

  return (
    <Pie title="Questões por Assunto" data={filteredData} />
  )
}