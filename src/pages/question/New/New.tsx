import React, { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";

import { AlertV2Props, Navigator } from "../../../components";
import { Form } from '../Form'
import { Mutation } from "../../../__generated__/graphql-schema";
import { useDispatch } from "react-redux";
import { turnOff, turnOn } from "../../../store/ducks/unsavedChanges";

const CREATE_QUESTION_MUTATION = gql`
  mutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        uuid
      }
    }
  }
`

export const New = () => {
  const dispatch = useDispatch()

  useMemo(() => { dispatch(turnOff()) }, [dispatch])

  document.onkeypress = function () {
    dispatch(turnOn())
  }

  const [alert, setAlert] = useState<AlertV2Props>();
  const [createQuestion] = useMutation<Mutation>(CREATE_QUESTION_MUTATION)
  const history = useHistory()

  const onSubmit = (inputs: any) => {
    createQuestion({
      variables: {
        input: {
          question: inputs,
        },
      },
    }).then(() => {
      window.location.href = '/'
    }).catch((error: string) => {
      setAlert({
        severity: "error",
        text: `Erro ao criar questão. ${error}. Por favor, tente novamente.`,
      });

      setTimeout(
        () => setAlert({ severity: "error", text: "" }),
        8000
      );
    })
  }

  const onDraftSubmit = (inputs: any) => {
    createQuestion({
      variables: {
        input: {
          question: inputs,
        },
      }
    }).then(({ data }) => {
      setAlert({
        severity: "success",
        text: "Rascunho criado com sucesso",
      });

      setTimeout(() => {
        const uuid = data?.createQuestion?.question?.uuid

        history.push(`/question/${uuid}/edit`)
      }, 3000);
    }).catch((error: string) => {
      setAlert({
        severity: "error",
        text: `Erro ao criar rascunho. ${error}`,
      });

      setTimeout(
        () => setAlert(undefined),
        8000
      );
    })
  }

  return (
    <>
      <Navigator home={true} />
      <div className="bg-gray-100 w-full my-2">
        <main>
          <Form onSubmit={onSubmit} onDraftSubmit={onDraftSubmit} alert={alert} />
        </main>
      </div>
    </>
  )
};
