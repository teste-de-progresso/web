import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Card, Button, InputGroup, Alert,
} from "../../components";
import { requestAuthentication } from "../../store/ducks/auth/actions";

import unifesoLogo from "../../assets/images/unifeso-logo-branco.svg";

const Layout = styled.div`
  display: grid;
  place-items: center;
`;

export const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const state = useSelector(({ auth }: any) => auth);
  const dispatch = useDispatch();
  const history = useHistory();

  type FormInputs = {
    email: string
    password: string
  }

  const handleLogin = (inputs: FormInputs) => {
    dispatch(requestAuthentication(inputs.email, inputs.password));
  };

  return (
    <Layout className="w-screen h-screen bg-primary-normal">
      <div>
        <img
          alt="Logo do Unifeso"
          src={unifesoLogo}
          style={{ width: "85%", margin: "auto" }}
        />
        <Card title="Entrar no Sistema">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full h-full md:max-w-xl md:h-auto"
          >
            {state.error ? <Alert>{state.error}</Alert> : null}
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
              <Button type="submit">Login</Button>
            </InputGroup>
          </form>

          <div
            className="mt-3 w-full text-center"
          >
            <button
              onClick={() => history.push("/password/new")}
              className="text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              Esqueceu sua senha?
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
