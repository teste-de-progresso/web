import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Alert } from "../Alert";
import { Button } from "../Button";
import { PhotoCrop } from "./PhotoCrop";

export const AvatarEditor = ({ sucessCallback, setAvatarEditorExhibition }) => {
  const { token } = useSelector((state) => state.auth);

  const [croppedImage, setCroppedImage] = useState();
  const [alert, setAlert] = useState();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.defaults.headers.common.Authorization = `Bearer ${token}`;

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
    <div className="p-4 ">
      { alert && <Alert>Algo deu errado, tente novamente mais tarde.</Alert>}
      <PhotoCrop callback={setCroppedImage} />
      <Button
        className="mx-3 gray-100"
        secondary
        onClick={() => setAvatarEditorExhibition(false)}
      >
        Cancelar
      </Button>
      <Button
        className="mx-3 gray-100"
        onClick={() => onSubmit()}
      >
        Salvar
      </Button>
    </div>
  );
};
