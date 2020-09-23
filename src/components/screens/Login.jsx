import React, { useState } from "react";
import styled from "styled-components";
import { Card, Button, Input, InputGroup, Alert } from "../widgets";
import { useDispatch, useSelector } from "react-redux";
import { requestAuthentication } from "../../store/ducks/auth/actions";
import unifesoLogo from "../../img/unifeso-logo-branco.svg";

const Layout = styled.div`
  display: grid;
  place-items: center;
`;

export const Login = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loginInputState, setLoginInputState] = useState({
    email: "admin@example.com",
    password: "password",
  });

  const handleLogin = () => {
    dispatch(
      requestAuthentication(loginInputState.email, loginInputState.password)
    );
  };

  const handleChange = (ev) => {
    setLoginInputState({
      ...loginInputState,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <Layout className="w-screen h-screen bg-primary-normal">
      <div>
        <img alt="Logo do Unifeso" src={unifesoLogo}></img>
        <form onSubmit={() => handleLogin()} className="w-full h-full md:max-w-xl md:h-auto">
          {state.error ? <Alert>{state.error}</Alert> : null}
          <Card title={"Entrar no Sistema"}>
            <InputGroup>
              <label>Email</label>
              <Input
                autoComplete={"email"}
                name={"email"}
                value={loginInputState.email}
                onChange={(ev) => handleChange(ev)}
              />
            </InputGroup>
            <InputGroup className="mt-4">
              <label>Senha</label>
              <Input
                type={"password"}
                autoComplete={"password"}
                name={"password"}
                value={loginInputState.password}
                onChange={(ev) => handleChange(ev)}
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
