import React, { FC, useState } from "react";
import axios from "axios";
import { DialogContent, DialogActions } from "@material-ui/core";

import { Alert } from "../Alert";
import { Button } from "../Button";
import { PhotoCrop } from "./PhotoCrop";
import { useUserContext } from "../../contexts";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

type Props = {
  setAvatarEditorExhibition: (value: boolean) => void;
};

export const AvatarEditor: FC<Props> = ({
  setAvatarEditorExhibition,
}) => {
  const { token } = useSelector((state: RootState) => state.auth)
  const [croppedImage, setCroppedImage] = useState<any>()
  const [alert, setAlert] = useState<boolean>()
  const { refetch } = useUserContext()

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
          setAvatarEditorExhibition(false)
          refetch()
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
        <Button secondary onClick={() => setAvatarEditorExhibition(false)}>
          Cancelar
        </Button>
        <Button onClick={() => onSubmit()}>Salvar</Button>
      </DialogActions>
    </>
  );
};
