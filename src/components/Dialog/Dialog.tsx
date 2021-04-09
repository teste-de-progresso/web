import React, { FC } from "react";
import AriaModal from "react-aria-modal";

type Props = {
  title?: string;
  open?: boolean;
  hidden?: boolean;
  onClose?: () => void;
};

export const Dialog: FC<Props> = ({
  title = "",
  open = false,
  onClose,
  children,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <AriaModal titleText="modal" onExit={handleClose}>
      <div className="h-screen grid place-items-stretch sm:place-items-center">
        <div className="bg-white pb-0 sm:pb-2 rounded-md">
          {title && <div className="py-4 px-6 text-xl">{title}</div>}
          {children}
        </div>
      </div>
    </AriaModal>
  );
};

export const DialogContent: FC = ({ children }) => (
  <div className="px-4 sm:px-6">{children}</div>
);

export const DialogButton: FC = ({ children }) => (
  <div className="mt-6 sm:mt-0 sm:py-4 mx-8 sm:mx-0 sm:px-2 sm:flex sm:justify-between sm:flex-row flex flex-col-reverse">
    {children}
  </div>
);
