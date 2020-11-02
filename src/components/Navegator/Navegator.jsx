import React from "react";
import { useAuth } from "../../utils/contexts/";
import {Link, useHistory} from "react-router-dom";
import {FaHome, FaLongArrowAltLeft, FaPlus} from "react-icons/fa";
import styled from 'styled-components';

const HorizontalMenu = styled.ul`
list-style: none;
& > li {
  display: inline;
  cursor: pointer;
}
& > li {
  display: inline;
  cursor: pointer;
}
& > li > div {
  display: inline-flex;
  flex-direction: row;
  margin-right: 2rem;
}
`

const Item = ({children}) => (
    <li className="hover:text-white">
      {children}
    </li>
)

export const Navigator = ({ needsConfirmation = false }) => {
  const history = useHistory();
  const auth = useAuth();

  const confirmLeave = () => {
    if (needsConfirmation) {
      const leaveConfirmed = window.confirm(
          "O progresso não foi salvo. Deseja sair sem salvar?"
      );

      return leaveConfirmed;
    }

    return true;
  }

  // TODO: Create dialog component
  const goHome = () => {
    if (confirmLeave()) {
      history.push('/')
    }
  };

  const createQuestion = () => {
    if (confirmLeave()) {
      history.push('/question/new')
    }
  }

  return (
      <div className="flex p-1 text-md px-8 text-gray-400 bg-primary-dark shadow-md">
        <HorizontalMenu className="list-none">
          <Item>
            <div onClick={() => goHome()}>
              <FaHome className="my-auto" />
              <span className="pl-3">Inicio</span>
            </div>
          </Item>
          {
            auth.isTeacher() ? <Item>
              <div onClick={() => createQuestion()}>
                <FaPlus className="my-auto" />
                <span className="pl-3">Nova Questão</span>
              </div>
            </Item> : null
          }
        </HorizontalMenu>
        {/*<div onClick={() => goHome()} className="flex flex-row hover:text-gray-200">*/}
        {/*  */}
        {/*</div>*/}
        {/*<div onClick={() => createQuestion()} className="flex flex-row hover:text-gray-200">*/}
        {/*  <FaPlus className="my-auto" />*/}
        {/*  <span className="pl-3">Criar Questão</span>*/}
        {/*</div>*/}
      </div>
  );
};