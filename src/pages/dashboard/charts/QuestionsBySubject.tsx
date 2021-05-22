import React, {FC} from 'react'
import {gql, useQuery} from '@apollo/client'

import {Query} from '../../../__generated__/graphql-schema'
import {Pie} from '../components/charts'
import {useDashboardContext} from "../DashboardContext";

type ResponsivePieData = {
  id: string
  label: string
  value: number
}[]

const QuestionsBySubjectCount = gql`
    query QuestionsBySubjectCount($where: QuestionWhereInput!) {
        subjects {
            nodes {
                id
                name
                questions(where: $where) {
                    totalCount
                }
            }
        }
    }
`

export const QuestionsBySubject: FC = () => {
  const {where} = useDashboardContext()
  const {loading, data} = useQuery<Query>(QuestionsBySubjectCount, {
    variables: {
      where,
    },
  })

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
    <Pie title="Questões por Assunto" data={filteredData}/>
  )
}