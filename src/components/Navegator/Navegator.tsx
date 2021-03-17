import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@material-ui/core";

import { Button } from "../Button";

const HorizontalMenu = styled.ul`
margin: 0;
padding: 0;
list-style: none;
width: 100%;
display: flex;
& > li {
  display: inline;
  cursor: pointer;
}
& > li {
  display: inline;
}
& > li > div {
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  margin-right: 2rem;
}
`;

type ItemProps = {
  className?: string
  children?: any
}

const Item: FC<ItemProps> = ({ children, className }) => (
  <div className={`hover:text-white ${className || ""}`}>
    {children}
  </div>
);

type Props = {
  needsConfirmation?: boolean
  home?: boolean
  newQuestion?: boolean
  children?: any
}

export const Navigator: FC<Props> = ({
  needsConfirmation = false, home = false, newQuestion = false, children,
}) => {
  const history = useHistory();
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false);

  const confirmLeave = () => {
    history.push("/");
  };

  const goHome = () => {
    if (needsConfirmation) {
      setConfirmLeaveDialog(true);
    } else {
      confirmLeave();
    }
  };

  const createQuestion = () => {
    history.push("/question/new");
  };

  return (
    <>
      <Dialog open={confirmLeaveDialog} onClose={() => setConfirmLeaveDialog(false)}>
        <DialogTitle>Modificações não Salvas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Todas as alterações serão descartadas. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button secondary onClick={() => setConfirmLeaveDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={() => confirmLeave()}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex p-1 text-md px-2 sm:px-8 text-gray-400 bg-primary-dark shadow-md" style={{ maxHeight: "34.4px" }}>
        <HorizontalMenu className="list-none">
          {home
            && (
              <Item>
                <button onClick={() => goHome()} className="flex">
                  <FaHome className="my-auto" />
                  <span className="pl-3">Início</span>
                </button>
              </Item>
            )}
          {
            (newQuestion) ? (
              <Item>
                <button onClick={() => createQuestion()} className="flex">
                  <FaPlus className="my-auto" />
                  <span className="pl-3">Nova Questão</span>
                </button>
              </Item>
            ) : null
          }
          {children}
        </HorizontalMenu>
      </div>
    </>
  );
};
