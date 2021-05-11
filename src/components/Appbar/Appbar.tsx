import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router';
import { Menu, Transition } from '@headlessui/react'

import unifesoLogoCompact from "../../assets/images/logoImgUnifeso.png";
import unifesoLogo from "../../assets/images/unifeso-logo-branco.svg";

import { Dialog, DialogContent, DialogButton } from '../Dialog'
import { useDispatch, useSelector } from 'react-redux';
import { useUserContext } from '../../contexts';
import { deleteSession } from '../../services/store/auth';
import { RootState } from '../../services/store';
import { Button } from '../Button';
import { Avatar } from '../Avatar'
import { classNames } from '../../utils';

const UserMenu = () => {
  const { user } = useUserContext();
  const history = useHistory();
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false)
  const dispatch = useDispatch();
  const unsavedChanges = useSelector((state: RootState) => state.unsavedChanges)

  const doLogout = () => dispatch(deleteSession());

  const handleLogout = () => {
    if (unsavedChanges && !confirmLeaveDialog) {
      setConfirmLeaveDialog(true)
    } else {
      doLogout()
    }
  }

  const openProfile = () => {
    history.push("/my_user");
  };

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
          <Button onClick={() => setConfirmLeaveDialog(false)}>
            Cancelar
          </Button>
          <Button type="primary" onClick={handleLogout}>
            Confirmar
          </Button>
        </DialogButton>
      </Dialog>
      <Menu as="div" className="ml-3 relative">
        {({ open }) => (
          <>
            <Menu.Button className="flex hover:bg-primary-dark text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <div className="flex flex-row items-center space-x-2 p-1">
                <span className="hidden md:block">{user?.name}</span>
                <Avatar
                  className="h-10 w-10 rounded-full"
                  src={user?.avatarUrl as string}
                />
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
              >
                <Menu.Item onClick={openProfile}>
                  {({ active }) => (
                    <span
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-900'
                      )}
                    >
                      Seu Perfil
                    </span>
                  )}
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                  {({ active }) => (
                    <span
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-900'
                      )}
                    >
                      Sair
                    </span>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  )
}

export const Appbar = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 bg-primary-normal">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <img
              alt="Símbolo do Unifeso"
              className="hidden md:block h-12 w-auto"
              src={unifesoLogo}
            />
            <img
              alt="Logotipo do Unifeso"
              className="md:hidden h-12 w-auto"
              src={unifesoLogoCompact}
            />
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <UserMenu />
        </div>
      </div>
    </div>
  )
}
