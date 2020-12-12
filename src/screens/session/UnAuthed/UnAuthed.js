import React, { useState } from "react";
import firebase from "firebase/app";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { MdSecurity } from "react-icons/md";
import unifesoLogo from "../../../img/unifeso-logo-branco.svg";
import { Loading } from "../../Loading";

const Layout = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #006b64;
`;

export const UnAuthed = () => {
  const [loading, setLoading] = useState(true);

  // TODO: Encontrar uma maneira melhor mostrar "Carregando" pra usuários enquanto o login não foi verificado.
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  if (loading) return <Loading />;

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <img
          alt="Logo do Unifeso"
          src={unifesoLogo}
          style={{ width: "80%", margin: "auto" }}
        />

        <Button
          onClick={async () => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(googleAuthProvider);
          }}
          variant="contained"
          endIcon={<MdSecurity color="#000000" />}
        >
          Entrar com e-mail institucional
        </Button>
      </div>
    </Layout>
  );
};
