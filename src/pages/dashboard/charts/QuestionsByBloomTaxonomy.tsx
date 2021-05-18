import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Query } from '../../../__generated__/graphql-schema'
import { Pie } from '../components/charts'

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
  const filteredData = mappeddata.filter(item => item.value)

  return (
    <Pie title="Questões por Habilidade Cognitiva" data={filteredData} />
  )
}