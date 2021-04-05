import React, { FC, useState } from 'react'
import { useParams } from 'react-router';
import { gql, useMutation, useQuery } from '@apollo/client';

import { Mutation, Query } from '../../../graphql/__generated__/graphql-schema';
import { AlertV2Props, Navigator } from '../../../components';
import { Form } from '../Form'

const GET_QUESTION = gql`
  query($uuid: ID!) {
    question(uuid: $uuid) {
      id
      uuid
      instruction
      support
      body
      alternatives {
        correct
        text
      }
      explanation
      references
      source
      authorshipYear
      difficulty
      checkType
      bloomTaxonomy
      subject {
        id
      }
      status
      reviewer {
        id
        name
      }
      reviewFeedbacks {
        id
        status
        comment
        user {
          name
          avatarUrl
        }
      }
      updatedAt
      createdAt
    }
  }
`;

const UPDATE_QUESTION_MUTATOIN = gql`
  mutation($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      payload {
        uuid
      }
    }
  }
`

type Params = {
  uuid: string
}

export const Edit: FC = () => {
  const [pageSaved, setPageSaved] = useState(true)
  const [alert, setAlert] = useState<AlertV2Props>()

  document.onkeypress = function () {
    setPageSaved(false)
  }

  const params = useParams<Params>()

  const [updateQuestion] = useMutation<Mutation>(UPDATE_QUESTION_MUTATOIN)

  const { loading, data } = useQuery<Query>(GET_QUESTION, { variables: { uuid: params.uuid } })

  const question = data?.question

  if (loading || !question) return null

  const onSubmit = (inputs: any) => {
    updateQuestion({
      variables: {
        input: {
          question: {
            ...inputs,
            id: question?.id,
          },
        },
      },
    }).then(() => {
      window.location.href = '/'
    }).catch((error: string) => {
      setAlert({
        severity: "error",
        text: `Erro ao atualizar questão. ${error}. Por favor, tente novamente.`,
      });

      setTimeout(
        () => setAlert({ severity: "error", text: "" }),
        8000
      );
    })
  }

  const onDraftSubmit = (inputs: any) => {
    updateQuestion({
      variables: {
        input: {
          question: {
            ...inputs,
            id: question?.id,
          },
        },
      }
    }).then(() => {
      setAlert({
        severity: "success",
        text: "Rascunho atualizado com sucesso",
      });

      setTimeout(() => {
        setAlert(undefined)
      }, 3000);

    }).catch((error: string) => {
      setAlert({
        severity: "error",
        text: `Erro ao atualizar rascunho. ${error}`,
      });

      setTimeout(
        () => setAlert(undefined),
        8000
      );
    })
  }

  return (
    <>
      <Navigator home needsConfirmation={!pageSaved} />
      <div className="bg-gray-100 w-full my-2">
        <main>
          <Form
            question={question}
            onSubmit={onSubmit}
            onDraftSubmit={onDraftSubmit}
            alert={alert}
            setPageSaved={setPageSaved}
          />
        </main>
      </div>
    </>
  )
}
