import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ResponsivePie } from '@nivo/pie'

import { Query } from '../../../__generated__/graphql-schema'

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
  const filtredData = mappedData.filter(item => item.value)

  return (
    <ResponsivePie
      data={filtredData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      enableArcLinkLabels={false}
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: -60,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 0,
          symbolSize: 20,
          itemDirection: 'left-to-right'
        }
      ]}
    />
  )
}