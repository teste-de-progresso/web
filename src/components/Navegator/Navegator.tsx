import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@material-ui/core";

import { Button } from "../Button";
import { turnOff } from "../../services/store/unsavedChanges";
import { RootState } from "../../services/store";

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
  home?: boolean
  newQuestion?: boolean
  children?: any
}

export const Navigator: FC<Props> = ({
  home = false, newQuestion = false, children,
}) => {
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false);
  const unsavedChanges = useSelector((state: RootState) => state.unsavedChanges)
  const dispatch = useDispatch()
  const history = useHistory();

  const confirmLeave = () => {
    dispatch(turnOff());
    history.push("/");
  };

  const goHome = () => {
    if (unsavedChanges) {
      setConfirmLeaveDialog(true);
    } else {
      confirmLeave();
    }
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
          <Button onClick={() => setConfirmLeaveDialog(false)}>
            Cancelar
          </Button>
          <Button type="primary" onClick={() => confirmLeave()}>
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
                <Link to="/questions/new" className="flex">
                  <FaPlus className="my-auto" />
                  <span className="pl-3">Nova Questão</span>
                </Link>
              </Item>
            ) : null
          }
          {children}
        </HorizontalMenu>
      </div>
    </>
  );
};
