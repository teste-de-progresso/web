import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ResponsivePie } from '@nivo/pie'

import { Query } from '../../../__generated__/graphql-schema'

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
  const filtredData = mappedData.filter(item => item.value)

  return (
    <ResponsivePie
      data={filtredData}
      margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
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