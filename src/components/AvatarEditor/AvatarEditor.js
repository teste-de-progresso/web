import React, { useState } from "react";
import axios from "axios";
import { DialogContent, DialogActions } from "@material-ui/core";

import { Alert } from "../Alert";
import { Button } from "../Button";
import { PhotoCrop } from "./PhotoCrop";

export const AvatarEditor = ({ sucessCallback, setAvatarEditorExhibition }) => {
  const [croppedImage, setCroppedImage] = useState();
  const [alert, setAlert] = useState();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  // instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSubmit = () => {
    instance
      .post("/update_user_avatar", {
        upload: croppedImage,
      })
      .then((res) => {
        if (res.status === 200) {
          setAvatarEditorExhibition(false);
          if (sucessCallback) sucessCallback(true);
          window.location = "/user/profile";
        } else {
          setAlert(true);
        }
      })
      .catch(() => {
        setAlert(true);
      });
  };

  return (
    <>
      <DialogContent>
        {alert && <Alert>Algo deu errado, tente novamente mais tarde.</Alert>}
        <PhotoCrop callback={setCroppedImage} />
      </DialogContent>
      <DialogActions>
        <Button
          secondary
          onClick={() => setAvatarEditorExhibition(false)}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onSubmit()}
        >
          Salvar
        </Button>
      </DialogActions>
    </>
  );
};
