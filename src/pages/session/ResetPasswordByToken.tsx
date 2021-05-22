import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import { authentication } from "../../services/api";
import { Card, Button, InputGroup, Dialog } from "../../components";

import unifesoLogo from "../../assets/images/unifeso-logo-branco.svg";
import {SessionRoutePaths} from "../../routes";

const Layout = styled.div`
  display: grid;
  place-items: center;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const ResetPasswordByToken = () => {
  const history = useHistory();
  const query = useQuery();
  const { register, handleSubmit } = useForm();

  const [response, setResponse] = useState({
    header: "",
    body: "",
    success: false,
  });
  const [modalOpen, setModalOpen] = useState(false);

  type FormInputs = {
    password: string
    password_confirmation: string
  }

  const handlePasswordReset = async (inputs: FormInputs) => {
    try {
      const success = await authentication.resetPasswordByToken({
        reset_password_token: query.get("reset_password_token") ?? "",
        ...inputs,
      });

      if (success) {
        setResponse({
          header: "Senha Redefinida",
          body: "Faça Login com sua nova senha",
          success,
        });
      } else {
        setResponse({
          header: "Falha do Redefinir Senha",
          body: "Perça um novo link de redefinição e tente novamente",
          success,
        });
      }
    } catch (error) {
      setResponse({
        header: "Falha do Redefinir Senha",
        body:
          "Tente novamente mais tarde ou entre em contato com o administrador",
        success: false,
      });
    }

    setModalOpen(true);
  };

  const confirmModal = () => {
    if (response.success) {
      history.push(SessionRoutePaths.signIn);
    } else {
      history.push(SessionRoutePaths.newPassword);
    }
  };

  return (
    <Layout className="w-screen h-screen bg-primary-normal">
      <Dialog
        type='notice'
        isOpen={modalOpen}
        setIsOpen={() => confirmModal()}
        title={response.header}
        text={response.body}
        onConfirmation={confirmModal}
      />
      <div>
        <img
          alt="Logo do Unifeso"
          src={unifesoLogo}
          style={{ width: "85%", margin: "auto" }}
        />
        <Card title="Criação de Senha">
          <form
            onSubmit={handleSubmit(handlePasswordReset)}
            className="w-full h-full md:max-w-xl md:h-auto"
          >
            <InputGroup>
              <label>Senha</label>
              <input
                className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                type="password"
                autoComplete="password"
                name="password"
                ref={register({ required: true })}
              />
            </InputGroup>
            <InputGroup>
              <label>Confirmação de Senha</label>
              <input
                className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                type="password"
                autoComplete="password"
                name="password_confirmation"
                ref={register({ required: true })}
              />
            </InputGroup>
            <InputGroup>
              <Button className="w-full" type="primary" htmlType="submit">Login</Button>
            </InputGroup>
          </form>
        </Card>
      </div>
    </Layout>
  );
};
