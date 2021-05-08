import React, { FC, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MdDeleteForever, MdEdit, MdSave } from "react-icons/md";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@material-ui/core";

import { ViewMode, ViewModeFragments, Feedbacks, FeedbacksFragments } from "../shared";
import { Navigator, Button } from "../../../components";
import { Mutation, Query, Question } from "../../../__generated__/graphql-schema";
import { AlertV2Props, AlertV2 } from "../../../components/AlertV2";
import { NodeId } from "../../../utils/graphql";

const GET_QUESTION = gql`
  ${ViewModeFragments}
  ${FeedbacksFragments}
  query Question($id: ID!) {
    node(id: $id) {
      __typename
      ... on Question {
        id
        ... QuestionFields
        reviewFeedbacks {
          ... FeedbackFields
        }
      }
    }
  }
`

const FINISH_QUESTION = gql`
  mutation ($id: ID!) {
    finishQuestion (
      input: {
        questionId: $id
      }
    ) {
      question {
        id
        status
      }
      errors
    }
  }
`

const DESTROY_QUESTION = gql`
  mutation ($id: ID!) {
    destroyQuestion(
      input: {
        questionId: $id
      }
    ) {
      deletedQuestionId
      errors
    }
  }
`

type Params = {
  id: string
}

export const Show: FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();
  const [confirmEditDialog, setConfirmEditDialog] = useState(false)
  const [confirmRegister, setConfirmRegister] = useState(false)
  const [confirmDestroy, setConfirmDestroy] = useState(false)
  const [alert, setAlert] = useState<AlertV2Props>()
  const [finishQuestion] = useMutation<Mutation>(FINISH_QUESTION)
  const [destroyQuestion] = useMutation<Mutation>(DESTROY_QUESTION)
  const { loading, data } = useQuery<Query>(GET_QUESTION, {
    variables: {
      id,
    },
  });
  const question = data?.node as Question | null

  if (loading || !question) return null;

  const recordId = NodeId.decode(question.id).id

  const confirmEditQuestion = () => {
    history.push(`/questions/${id}/edit`);
  };

  const handleEditQuestion = () => {
    if (question.status === "finished" || question.status === "approved") {
      setConfirmEditDialog(true);
    } else {
      confirmEditQuestion();
    }
  };

  const handleRegisterQuestion = async () => {
    await finishQuestion({ variables: { id: recordId } })
  };

  const handleDestroyQuestion = async () => {
    const { data } = await destroyQuestion({ variables: { id: recordId } })

    if (data?.destroyQuestion?.deletedQuestionId) {
      history.push('/')
    } else {
      setAlert({
        text: 'Algo inesperado aconteceu ao tentar excluir a questão.',
        severity: 'error',
      })
      setConfirmDestroy(false)
    }
  };

  const ACTIONS = {
    edit: {
      icon: <MdEdit className="my-auto" />,
      label: "Editar",
      action: handleEditQuestion,
    },
    register: {
      icon: <MdSave className="my-auto" />,
      label: "Registrar",
      action: () => setConfirmRegister(true),
    },
    destroy: {
      icon: <MdDeleteForever className="my-auto" />,
      label: 'Excluir',
      action: () => setConfirmDestroy(true),
    }
  }

  const options = () => {
    switch (question.status) {
      case 'finished':
        return ([]);
      case 'approved':
        return ([ACTIONS.edit, ACTIONS.register, ACTIONS.destroy])
      default:
        return ([ACTIONS.edit, ACTIONS.destroy])
    }
  }

  return (
    <>
      <Dialog open={confirmDestroy} onClose={() => setConfirmDestroy(false)}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após a exclusão, a questão não poderá ser recuperada. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button secondary onClick={() => setConfirmDestroy(false)}>
            Cancelar
          </Button>
          <Button onClick={() => handleDestroyQuestion()}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmRegister} onClose={() => setConfirmRegister(false)}>
        <DialogTitle>Confirmação de Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após o registro, a questão estará disponível para uso e não poderá mais ser editada ou excluída. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button secondary onClick={() => setConfirmRegister(false)}>
            Cancelar
          </Button>
          <Button onClick={() => handleRegisterQuestion()}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmEditDialog} onClose={() => setConfirmEditDialog(false)}>
        <DialogTitle>Confirmação de Edição</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Alterar uma questão registrada irá requerir uma nova revisão do seu par. Deseja ir para tela de edição?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button secondary onClick={() => setConfirmEditDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={() => confirmEditQuestion()}>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
      <Navigator home>
        {options().map((option, index) => (
          <div key={`navigation-item-${index}`} className={`hover:text-white ${index === 0 ? "ml-auto" : ""}`}>
            <button onClick={option.action} className="flex pl-4">
              {option.icon}
              <span className="pl-2">{option.label}</span>
            </button>
          </div>
        ))}
      </Navigator>
      <div className="bg-gray-100 w-full my-2">
        <main className="max-w-screen-xl m-auto">
          <div className="flex">
            {alert && <AlertV2 severity={alert.severity} text={alert.text} />}
          </div>
          <div className="flex px-5">
            <div className="w-3/5">
              <ViewMode questionData={question} />
            </div>
            <div className="w-2/5 ml-3">
              <Feedbacks feedbacks={question.reviewFeedbacks} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
