import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert, Modal } from "..";
import { PhotoCrop } from ".";

export const AvatarEditor = ({ sucessCallback }) => {
  const { token } = useSelector((state) => state.auth);

  const [croppedImage, setCroppedImage] = useState();
  const [showingModal, setShowingModal] = useState(true);
  const [alert, setAlert] = useState();

  const onCloseModal = () => {
    setShowingModal(false);
  };

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const onSubmit = () => {
    instance
      .post("/update_user_avatar", {
        upload: croppedImage,
      })
      .then((res) => {
        if (res.status === 200) {
          setShowingModal(false);
          if (sucessCallback) sucessCallback(true);
        } else {
          setAlert(true);
        }
      })
      .catch(() => {
        setAlert(true);
      });
  };

  if (!showingModal) return null;

  return (
    <Modal
      confirmButtonText="Enviar"
      closeButtonText="Cancelar"
      onClose={onCloseModal}
      onConfirm={onSubmit}
    >
      {alert && <Alert>Algo deu errado, tente novamente mais tarde.</Alert>}
      <PhotoCrop callback={setCroppedImage} />
    </Modal>
  );
};
