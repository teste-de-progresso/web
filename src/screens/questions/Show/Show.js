import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MdEdit, MdSave } from "react-icons/md";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from "@material-ui/core";

import { ReadQuestion, QuestionFeedback } from "../shared";
import { Navigator } from "../../../components";

const Item = ({ children, className }) => (
  <div className={`hover:text-white ${className || ""}`}>
    {children}
  </div>
);

export const Show = () => {
  const FINISH_QUESTION = loader("../../../graphql/mutation/finishQuestion.gql");
  const GET_QUESTION = loader("../../../graphql/query/getQuestion.gql");
  const { id: questionUUID } = useParams();
  const history = useHistory();
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);

  const [finishQuestion] = useMutation(FINISH_QUESTION);

  if (!questionUUID) history.push("/");

  const { loading, data } = useQuery(GET_QUESTION, {
    variables: {
      uuid: questionUUID,
    },
  });

  if (loading) return null;

  const { question: questionData } = data;

  const confirmEditQuestion = () => {
    history.push(`/question/${questionUUID}/edit`);
  };

  const handleEditQuestion = () => {
    if (questionData.status === "finished" || questionData.status === "approved") {
      setConfirmEditDialog(true);
    } else {
      confirmEditQuestion();
    }
  };

  const handleRegisterQuestion = () => {
    const { id: questionId } = questionData;
    finishQuestion({
      variables: {
        questionId,
      },
    });
  };

  const options = [
    {
      icon: <MdEdit className="my-auto" />,
      label: "Editar",
      action: handleEditQuestion,
    },
  ];

  if (questionData.status === "approved") {
    options.push(
      {
        icon: <MdSave className="my-auto" />,
        label: "Registrar",
        action: handleRegisterQuestion,
      },
    );
  }

  return (
    <>
      <Dialog open={confirmEditDialog} onClose={() => setConfirmEditDialog(false)}>
        <DialogTitle>Deseja realmente editar esta questão?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Alterar uma questão registrada irá requerir uma nova revisão do seu par, deseja ir para tela de edição?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setConfirmEditDialog(false)}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={() => confirmEditQuestion()}>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
      <Navigator home>
        {options.map((option, index) => (
          <Item
            className={index === 0 ? "ml-auto" : ""}
            key={index}
          >
            <button onClick={option.action} className="flex pl-4">
              {option.icon}
              <span className="pl-2">{option.label}</span>
            </button>
          </Item>
        ))}
      </Navigator>
      <div className="bg-gray-100 w-full my-2">
        <main className="m-auto">
          <div className="flex px-5">
            <div className="w-3/5">
              <ReadQuestion questionData={questionData} />
            </div>
            <div className="w-2/5 ml-3">
              <QuestionFeedback feedbacks={questionData.reviewFeedbacks} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
