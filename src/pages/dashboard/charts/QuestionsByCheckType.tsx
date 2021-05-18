import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Query } from '../../../__generated__/graphql-schema'
import { Pie } from '../components/charts'

type ResponsivePieData = {
  id: string
  label: string
  value: number
}[]

type QuestionsByCheckTypeQueryResponse = {
  uniqueAnswer: Query['questions']
  incompleteAffirmation: Query['questions']
  multipleAnswer: Query['questions']
  negativeFocus: Query['questions']
  assertionAndReason: Query['questions']
  gap: Query['questions']
  interpretation: Query['questions']
  association: Query['questions']
  orderingOrRanking: Query['questions']
  constantAlternatives: Query['questions']
}

const QuestionsByCheckTypeQuery = gql`
  query QuestionsByCheckTypeQuery {
    uniqueAnswer: questions (where: { checkType: [ unique_answer ] }) {
      totalCount
    }
    incompleteAffirmation: questions (where: { checkType: [ incomplete_affirmation ] }) {
      totalCount
    }
    multipleAnswer: questions (where: { checkType: [ multiple_answer ] }) {
      totalCount
    }
    negativeFocus: questions (where: { checkType: [ negative_focus ] }) {
      totalCount
    }
    assertionAndReason: questions (where: { checkType: [ assertion_and_reason ] }) {
      totalCount
    }
    gap: questions (where: { checkType: [ gap ] }) {
      totalCount
    }
    interpretation: questions (where: { checkType: [ interpretation ] }) {
      totalCount
    }
    association: questions (where: { checkType: [ association ] }) {
      totalCount
    }
    orderingOrRanking: questions (where: { checkType: [ ordering_or_ranking ] }) {
      totalCount
    }
    constantAlternatives: questions (where: { checkType: [ constant_alternatives ] }) {
      totalCount
    }
  }
`

export const QuestionByCheckType: FC = () => {
  const { loading, data } = useQuery<QuestionsByCheckTypeQueryResponse>(
    QuestionsByCheckTypeQuery, {
    onError: (error) => {
      console.log(error)
    }
  })

  if (loading || !data) return null

  const mappedData: ResponsivePieData = [
    {
      id: "Asserção e Razão",
      label: "Asserção e Razão",
      value: data.assertionAndReason.totalCount ?? 0
    },
    {
      id: "Associação",
      label: "Associação",
      value: data.association.totalCount ?? 0
    },
    {
      id: "Alternativas Constantes",
      label: "Alternativas Constantes",
      value: data.constantAlternatives.totalCount ?? 0
    },
    {
      id: "Lacuna",
      label: "Lacuna",
      value: data.gap.totalCount ?? 0
    },
    {
      id: "Afirmação Incompleta",
      label: "Afirmação Incompleta",
      value: data.incompleteAffirmation.totalCount ?? 0
    },
    {
      id: "Interpretação",
      label: "Interpretação",
      value: data.interpretation.totalCount ?? 0
    },
    {
      id: "Resposta Múltipla",
      label: "Resposta Múltipla",
      value: data.multipleAnswer.totalCount ?? 0
    },
    {
      id: "Foco Negativo",
      label: "Foco Negativo",
      value: data.negativeFocus.totalCount ?? 0
    },
    {
      id: "Ordenação ou Seriação",
      label: "Ordenação ou Seriação",
      value: data.orderingOrRanking.totalCount ?? 0
    },
    {
      id: "Resposta Única",
      label: "Resposta Única",
      value: data.uniqueAnswer.totalCount ?? 0
    },
  ]
  const filteredData = mappedData.filter(item => item.value)

  return (
    <Pie title="Questões por Tipo" data={filteredData} />
  )
}