import React, {FC, Fragment, useState} from 'react'
import {useHistory, useLocation} from 'react-router';
import {Menu, Transition} from '@headlessui/react'
import {ChartBarIcon, ClipboardListIcon} from '@heroicons/react/outline'

import unifesoLogoCompact from "../../assets/images/logoImgUnifeso.png";
import unifesoLogo from "../../assets/images/unifeso-logo-branco.svg";

import {Dialog} from '../Dialog'
import {useDispatch, useSelector} from 'react-redux';
import {useUserContext} from '../../contexts';
import {deleteSession} from '../../services/store/auth';
import {RootState} from '../../services/store';
import {classNames} from '../../utils';
import {DashboardRoutePaths, QuestionRoutePaths, SessionRoutePaths} from '../../routes'
import {turnOff} from '../../services/store/unsavedChanges';
import {CurrentUserAvatar} from "../CurrentUserAvatar";

const UserMenu: FC = () => {
  const {user} = useUserContext();
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
    history.push(SessionRoutePaths.show);
  };

  return (
    <>
      <Dialog
        isOpen={confirmLeaveDialog}
        setIsOpen={setConfirmLeaveDialog}
        onConfirmation={handleLogout}
        title="Modificações não Salvas"
        text="Todas as alterações serão descartadas. Deseja continuar?"
      />
      <Menu as="div" className="relative h-full">
        {({open}) => (
          <>
            <Menu.Button
              className="h-full flex flex-row px-2 items-center hover:bg-primary-dark text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="hidden md:block pr-2">
                {user?.name}
              </span>
              <div className="w-12">
                <CurrentUserAvatar/>
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
                className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
              >
                <Menu.Item onClick={openProfile}>
                  {({active}) => (
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
                  {({active}) => (
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

const Links: FC = () => {
  const unsavedChanges = useSelector((state: RootState) => state.unsavedChanges)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const [newPath, setNewPath] = useState<string>()

  const handleForcedRedirect = () => {
    if (!newPath) return

    dispatch(turnOff())
    setNewPath(undefined)
    history.push(newPath)
  }

  const handleLinkClick = (pathname: string) => {
    if (unsavedChanges) {
      setNewPath(pathname)
    } else {
      history.push(pathname)
    }
  }


  const links = [{
    icon: <ChartBarIcon className="w-6"/>,
    tabel: 'Dashboard',
    pathname: DashboardRoutePaths.index,
    isCurrent: location.pathname.includes('dashboard'),
  },
    {
      icon: <ClipboardListIcon className="w-6"/>,
      tabel: 'Questões',
      pathname: QuestionRoutePaths.index,
      isCurrent: location.pathname.includes('question'),
    }]

  return (
    <>
      <Dialog
        isOpen={!!newPath}
        setIsOpen={(value) => setNewPath(value ? newPath : undefined)}
        onConfirmation={handleForcedRedirect}
        title="Modificações não Salvas"
        text="Todas as alterações serão descartadas. Deseja continuar?"
      />
      <div className="h-full flex items-center pl-4">
        {links.map((link) => (
          <button
            className={`h-full flex items-center px-2 mx-2 text-gray-300 hover:bg-primary-dark ${link.isCurrent ? 'underline bg-primary-dark' : ''}`}
            key={`navbar-link-${link.pathname}`}
            onClick={() => handleLinkClick(link.pathname)}
          >
            <span className="pr-2 ">
              {link.icon}
            </span>
            {link.tabel}
          </button>
        ))}
      </div>
    </>
  )
}

const Logo: FC = () => (
  <div className="h-full grid place-items-center">
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
)

export const Appbar = () => {
  return (
    <div className="px-4 bg-primary-normal flex items-center justify-between h-16 shadow-md">
      <div className="flex h-full">
        <Logo/>
        <Links/>
      </div>
      <UserMenu/>
    </div>
  )
}
