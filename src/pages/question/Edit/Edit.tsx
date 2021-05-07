import React, { FC, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { gql, useMutation, useQuery } from '@apollo/client';

import { Mutation, Query, Question } from '../../../__generated__/graphql-schema';
import { AlertV2Props, Navigator } from '../../../components';
import { Form } from '../Form'
import { turnOn, turnOff } from '../../../services/store/unsavedChanges';
import { NodeId } from '../../../utils/graphql';

const GET_QUESTION = gql`
query Question ($id: ID!) {
  node (id: $id) {
    __typename
    ...on Question {
      id
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
}
`;

const UPDATE_QUESTION_MUTATOIN = gql`
  mutation($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      question {
        id
      }
      errors
    }
  }
`

type Params = {
  id: string
}

export const Edit: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useMemo(() => { dispatch(turnOff()) }, [dispatch])
  document.onkeypress = () => {
    dispatch(turnOn())
  }

  const [alert, setAlert] = useState<AlertV2Props>()
  const params = useParams<Params>()
  const [updateQuestion] = useMutation<Mutation>(UPDATE_QUESTION_MUTATOIN)
  const { loading, data } = useQuery<Query>(GET_QUESTION, { variables: { id: params.id } })
  const question = data?.node as Question | null

  if (loading || !question) return null

  const recordId = NodeId.decode(question.id).id

  const onSubmit = (inputs: any) => {
    updateQuestion({
      variables: {
        input: {
          question: {
            ...inputs,
            id: recordId,
          },
        },
      },
    }).then(() => {
      history.push('/')
    }).catch((error: string) => {
      setAlert({
        severity: "error",
        text: `Erro ao atualizar questão. ${error}. Por favor, tente novamente.`,
      });

      setTimeout(
        () => setAlert({ severity: "error", text: "" }),
        3000
      );
    })
  }

  const onDraftSubmit = (inputs: any) => {
    updateQuestion({
      variables: {
        input: {
          question: {
            ...inputs,
            id: recordId,
          },
        },
      }
    }).then(() => {
      dispatch(turnOff())

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
      <Navigator home />
      <div className="bg-gray-100 w-full my-2">
        <main>
          <Form
            question={question}
            onSubmit={onSubmit}
            onDraftSubmit={onDraftSubmit}
            alert={alert}
          />
        </main>
      </div>
    </>
  )
}
