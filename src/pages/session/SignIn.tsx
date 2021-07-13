import React from "react";
import firebase from "firebase/app";

import unifesoLogo from "../../assets/images/unifeso-logo-branco.svg";
import { Button } from "../../components";

export const SignIn = () => {
  const handleLogin = async () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(googleAuthProvider);
  }

  return (
    <div className="w-screen h-screen bg-primary-normal grid place-items-center">
      <div>
        <img
          alt="Logo do Unifeso"
          src={unifesoLogo}
          style={{ width: "85%", margin: "auto" }}
        />
        <div className="grid place-items-center">
          <Button onClick={handleLogin}>Faça login no Google</Button>
        </div>
      </div>
    </div>
  );
};
