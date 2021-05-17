import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ResponsivePie } from '@nivo/pie'

import { Query } from '../../../__generated__/graphql-schema'

type ResponsivePieData = {
  id: string
  label: string
  value: number
}[]

type QuestionsByBloomTaxonomyQueryResponse = {
  remember: Query['questions']
  understand: Query['questions']
  apply: Query['questions']
  analyze: Query['questions']
  evaluate: Query['questions']
  create: Query['questions']
}

const QuestionsByBloomTaxonomyQuery = gql`
  query QuestionByBloomTaxonomyQuery {
    remember: questions (where: { bloomTaxonomy: [ remember ] }) {
      totalCount
    }
    understand: questions (where: { bloomTaxonomy: [ understand ] }) {
      totalCount
    }
    apply: questions (where: { bloomTaxonomy: [ apply ] }) {
      totalCount
    }
    analyze: questions (where: { bloomTaxonomy: [ analyze ] }) {
      totalCount
    }
    evaluate: questions (where: { bloomTaxonomy: [ evaluate ] }) {
      totalCount
    }
    create: questions (where: { bloomTaxonomy: [ create ] }) {
      totalCount
    }
  }
`

export const QuestionByBloomTaxonomy: FC = () => {
  const { loading, data } = useQuery<QuestionsByBloomTaxonomyQueryResponse>(
    QuestionsByBloomTaxonomyQuery, {
    onError: (error) => {
      console.log(error)
    }
  })

  if (loading || !data) return null


  const mappeddata: ResponsivePieData = [
    {
      id: "Recordar",
      label: "Recordar",
      value: data.remember.totalCount ?? 0
    },
    {
      id: "Compreender",
      label: "Compreender",
      value: data.understand.totalCount ?? 0
    },
    {
      id: "Aplicar",
      label: "Aplicar",
      value: data.apply.totalCount ?? 0
    },
    {
      id: "Analisar",
      label: "Analisar",
      value: data.analyze.totalCount ?? 0
    },
    {
      id: "Avaliar",
      label: "Avaliar",
      value: data.evaluate.totalCount ?? 0
    },
    {
      id: "Criar",
      label: "Criar",
      value: data.create.totalCount ?? 0
    },
  ]
  const filtredData = mappeddata.filter(item => item.value)

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