import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MdEdit, MdSave } from "react-icons/md";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@material-ui/core";

import { ReadQuestion } from "../shared";
import { Navigator, Button } from "../../../components";

const Item = ({ children, className }) => (
  <li className={`hover:text-white ${className || ""}`}>
    {children}
  </li>
);

export const Show = () => {
  const FINISH_QUESTION = loader("../../../graphql/mutation/finishQuestion.gql");
  const GET_QUESTION = loader("../../../graphql/query/getQuestion.gql");
  const { id: questionId } = useParams();
  const history = useHistory();
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);

  const [finishQuestion] = useMutation(FINISH_QUESTION);

  if (!questionId) history.push("/");

  const { loading, data } = useQuery(GET_QUESTION, {
    variables: {
      id: questionId,
    },
  });

  if (loading) return null;

  const { question: questionData } = data;

  const confirmEditQuestion = () => {
    if (questionData.status !== "finished") {
      history.push(`/question/${questionId}/edit`);
    }
  };

  const handleEditQuestion = () => {
    if (questionData.status !== "finished") {
      setConfirmEditDialog(true);
    } else {
      confirmEditQuestion();
    }
  };

  const handleRegisterQuestion = () => {
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
            Alterar uma questão registrada irá requerir uma revisão da quetão, deseja confirmar essa ação?
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
        {options.map((option, index) => (
          <Item
            className={index === 0 ? "ml-auto" : ""}
            key={index}
          >
            <div
              onClick={option.action}
            >
              {option.icon}
              <span className="pl-3">{option.label}</span>
            </div>
          </Item>
        ))}
      </Navigator>
      <div className="bg-gray-100 w-full my-2">
        <main>
          <ReadQuestion questionData={questionData} />
        </main>
      </div>
    </>
  );
};
