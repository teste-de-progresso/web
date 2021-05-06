import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/ducks/auth/actions";
import { useUserContext } from "../../contexts";
import { Avatar } from "../Avatar";
import { Dialog, DialogContent, DialogButton } from '../Dialog'

import unifesoLogo from "../../img/unifeso-logo-branco.svg";
import logoImgUnifeso from "../../img/logoImgUnifeso.png";
import { Button } from "../Button";

export const AppBar = () => {
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const { user } = useUserContext();
  const history = useHistory();
  const unsavedChanges = useSelector((state: any) => state.unsavedChanges)

  const doLogout = () => dispatch(logout());
  const openProfile = () => {
    history.push("/user/profile");
  };

  const handleClick = () => setOpen(!open)

  const handleLogout = () => {
    if (unsavedChanges && !confirmLeaveDialog) {
      setConfirmLeaveDialog(true)
    } else {
      doLogout()
    }
  }

  return (
    <>
      <Dialog
        open={confirmLeaveDialog}
        onClose={() => setConfirmLeaveDialog(false)}
        title="Modificações não Salvas"
      >
        <DialogContent>
          Todas as alterações serão descartadas. Deseja continuar?
        </DialogContent>
        <DialogButton>
          <Button secondary onClick={() => setConfirmLeaveDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={handleLogout}>
            Confirmar
          </Button>
        </DialogButton>
      </Dialog>
      <nav className="h-16 bg-primary-normal w-full flex items-center px-1 sm:px-8 z-10">
        <div className="flex-grow">
          <img alt="Logo do Unifeso" className="h-10 sm:h-12" src={window.screen.width > 640 ? unifesoLogo : logoImgUnifeso} />
        </div>
        <div onClick={handleClick} className="group inline-block relative text-white text-sm sm:text-base font-medium hover:bg-primary-dark p-2 hover:shadow-lg cursor-pointer z-20">
          <div className="flex flex-row items-center space-x-2">
            <span>{user?.name || user?.email}</span>
            <Avatar src={user?.avatarUrl ?? ""} className="w-10 sm:w-12" />
          </div>
          {open &&
            <>
              <div className="absolute pt-1 w-full right-0 text-black z-20">
                <div className="mt-2 bg-white rounded shadow-md border border-gray-300 font-light">
                  <div
                    className="rounded-t py-2 px-4 block whitespace-no-wrap hover:bg-gray-200 border-b border-gray-300"
                    onClick={openProfile}
                  >
                    <p>Perfil</p>
                  </div>
                  <div
                    className="py-2 px-4 block whitespace-no-wrap hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    <p>Sair</p>
                  </div>
                </div>
              </div>
              <div className="fixed w-full h-full z-10 top-0 left-0 cursor-default" />
            </>
          }
        </div>
      </nav>
    </>
  );
};
