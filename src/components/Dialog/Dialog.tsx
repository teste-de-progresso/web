import React, { FC } from "react"
import { Button } from "../Button"
import { Modal } from '../Modal'

type Props = {
  title: string
  isOpen?: boolean
  hidden?: boolean
  text?: any
  setIsOpen: (state: boolean) => void
  onConfirmation: () => void
};

export const Dialog: FC<Props> = ({
  title,
  isOpen: open = false,
  setIsOpen,
  onConfirmation,
  text,
}) => {
  return (
    <Modal
      title={title}
      isOpen={open}
      setIsOpen={setIsOpen}
      buttons={
        <>
          <Button onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button type="primary" onClick={onConfirmation}>
            Confirmar
          </Button>
        </>
      }
    >
      {text}
    </Modal>
  )
};

