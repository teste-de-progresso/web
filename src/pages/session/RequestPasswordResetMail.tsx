import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Card, Button, InputGroup, Dialog } from "../../components";
import { authentication } from "../../services/api";

import unifesoLogo from "../../assets/images/unifeso-logo-branco.svg";
import {SessionRoutePaths} from "../../routes";

const Layout = styled.div`
  display: grid;
  place-items: center;
`;

export const RequestPasswordResetMail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [response, setResponse] = useState({
    header: "",
    body: "",
    success: false,
  });
  const [disableButton, setDisableButton] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  type FormInputs = {
    email: string
  }

  const handleResetPasswordEmail = async ({ email }: FormInputs) => {
    setDisableButton(true);

    try {
      const success = await authentication.resetPasswordEmail(email);

      if (success) {
        setResponse({
          header: "Email enviado",
          body: "Verifique sua caixa de entrada",
          success,
        });
      } else {
        setResponse({
          header: "Falha ao redefinir senha",
          body: "Verifique seu email e tente novamente",
          success,
        });
      }
    } catch (error) {
      setResponse({
        header: "Falha ao redefinir senha",
        body:
          "Tente novamente mais tarde ou entre em contato com o administrador",
        success: false,
      });
    }

    setDisableButton(false);
    setModalOpen(true);
  };

  const confirmModal = () => {
    if (response.success) {
      history.push(SessionRoutePaths.signIn);
    } else {
      setModalOpen(false);
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
        <Card title="Recuperação de Senha">
          <form
            onSubmit={handleSubmit(handleResetPasswordEmail)}
            className="w-full h-full md:max-w-xl md:h-auto"
          >
            <InputGroup>
              <label>Email</label>
              <input
                className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                type="email"
                autoComplete="email"
                name="email"
                ref={register({ required: true })}
              />
            </InputGroup>
            <InputGroup>
              <Button className="w-full" type="primary" htmlType="submit" disabled={disableButton}>
                Enviar e-mail de redefinição
              </Button>
            </InputGroup>
          </form>

          <div className="mt-3 w-full text-center">
            <button
              onClick={() => history.push(SessionRoutePaths.signIn)}
              className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              Voltar
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
