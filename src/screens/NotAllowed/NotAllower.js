import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { MdSecurity } from "react-icons/md";
import firebase from "firebase";
import { Alert } from "@material-ui/lab";
import unifesoLogo from "../../img/unifeso-logo-branco.svg";

const Layout = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #006b64;
`;

export const NotAllowed = () => {
  const userEmail = firebase.auth().currentUser.email;

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <img
          alt="Logo do Unifeso"
          src={unifesoLogo}
          style={{ width: "80%", margin: "auto" }}
        />
        <Alert severity="error">
          {userEmail}
          {" "}
          não possui permissão para acesssar a plataforma!
        </Alert>
        <div style={{ margin: "1rem" }} />
        <Button
          onClick={() => firebase.auth().signOut()}
          variant="contained"
          endIcon={<MdSecurity color="#000000" />}
        >
          Logar com outra conta
        </Button>
      </div>
    </Layout>
  );
};
