import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Query } from '../../../__generated__/graphql-schema'
import { Pie } from '../components/charts'

type ResponsivePieData = {
  id: string
  label: string
  value: number
}[]

type QuestionsByDifficultyQueryResponse = {
  easy: Query['questions']
  medium: Query['questions']
  hard: Query['questions']
}

const QuestionsByDifficultyQuery = gql`
  query QuestionsByDifficultyQuery {
    easy: questions (where: { difficulty: [ easy ] }) {
      totalCount
    }
    medium: questions (where: { difficulty: [ medium ] }) {
      totalCount
    }
    hard: questions (where: { difficulty: [ hard ] }) {
      totalCount
    }
  }
`

export const QuestionsByDifficulty: FC = () => {
  const { loading, data } = useQuery<QuestionsByDifficultyQueryResponse>(
    QuestionsByDifficultyQuery, {
    onError: (error) => {
      console.log(error)
    }
  })

  if (loading || !data) return null


  const mappedData: ResponsivePieData = [
    {
      id: "Fácil",
      label: "Fácil",
      value: data.easy.totalCount ?? 0
    },
    {
      id: "Difícil",
      label: "Difícil",
      value: data.hard.totalCount ?? 0
    },
    {
      id: "Média",
      label: "Média",
      value: data.medium.totalCount ?? 0
    },
  ]
  const filteredData = mappedData.filter(item => item.value)

  return (
    <Pie title="Questões por Dificuldade" data={filteredData} />
  )
}