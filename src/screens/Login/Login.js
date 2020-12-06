import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Card, Button, Input, InputGroup, Alert,
} from "../../components";
import { requestAuthentication } from "../../store/ducks/auth/actions";
import unifesoLogo from "../../img/unifeso-logo-branco.svg";

const Layout = styled.div`
  display: grid;
  place-items: center;
`;

export const Login = () => {
  const state = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleLogin = (inputs) => {
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
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full h-full md:max-w-xl md:h-auto"
        >
          {state.error ? <Alert>{state.error}</Alert> : null}
          <Card title="Entrar no Sistema">
            <InputGroup>
              <label>Email</label>
              <Input
                type="email"
                autoComplete="email"
                name="email"
                ref={register({ required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-4">
              <label>Senha</label>
              <Input
                type="password"
                autoComplete="password"
                name="password"
                ref={register({ required: true })}
              />
            </InputGroup>
            <InputGroup className="mt-4">
              <Button type="submit">Login</Button>
            </InputGroup>
          </Card>
        </form>
      </div>
    </Layout>
  );
};
