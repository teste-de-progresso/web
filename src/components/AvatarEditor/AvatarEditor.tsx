import React, { FC, useState } from "react";
import axios from "axios";

import { Alert } from "../Alert";
import { Button } from "../Button";
import { PhotoCrop } from "./PhotoCrop";
import { useUserContext } from "../../contexts";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { Modal } from "../Modal";

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void;
};

export const AvatarEditor: FC<Props> = ({ isOpen, setIsOpen }) => {
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
      .post("/update_avatar", {
        upload: croppedImage,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsOpen(false)
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
    <Modal
      title="Alterar Imagem de Perfil"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttons={
        <>
          <Button onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button type="primary" onClick={() => onSubmit()}>
            Salvar
          </Button>
        </>
      }
    >
      {alert && <Alert>Algo deu errado, tente novamente mais tarde.</Alert>}
      <PhotoCrop callback={setCroppedImage} />
    </Modal>
  );
};
