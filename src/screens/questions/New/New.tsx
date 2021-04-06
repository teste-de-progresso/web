import React, { useState } from "react";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";

import { AlertV2Props, Navigator } from "../../../components";
import { Form } from '../Form'
import { Mutation } from "../../../graphql/__generated__/graphql-schema";

const CREATE_QUESTION_MUTATION = gql`
  mutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      payload {
        uuid
      }
    }
  }
`

export const New = () => {
  const [pageSaved, setPageSaved] = useState(true)
  const [alert, setAlert] = useState<AlertV2Props>();

  document.onkeypress = function () {
    setPageSaved(false)
  }

  const [createQuestion] = useMutation<Mutation>(CREATE_QUESTION_MUTATION)
  const history = useHistory()

  const onSubmit = (inputs: any) => {
    createQuestion({
      variables: {
        input: {
          question: inputs,
        },
      },
    }).then(({ data }) => {
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
        const uuid = data?.createQuestion?.payload?.uuid

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
      <Navigator home needsConfirmation={!pageSaved} />
      <div className="bg-gray-100 w-full my-2">
        <main>
          <Form onSubmit={onSubmit} onDraftSubmit={onDraftSubmit} alert={alert} />
        </main>
      </div>
    </>
  )
};
