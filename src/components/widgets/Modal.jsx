import React from "react";
import { Button } from ".";

export const Modal = ({
  children,
  closeButtonText,
  confirmButtonText,
  onClose,
  onConfirm,
}) => {
  const closeButtonHandle = () => {
    onClose();
  };

  const confirmButtonHandle = () => {
    onConfirm();
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:flex-col sm:items-start">
              {children}
              <div className="flex-row-reverse w-full">
                {(closeButtonText || confirmButtonText) && (
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    {confirmButtonText && (
                      <Button onClick={confirmButtonHandle} className="mx-3">
                        {confirmButtonText}
                      </Button>
                    )}
                    {closeButtonText && (
                      <Button
                        className="mx-3 gray-100"
                        secondary={true}
                        onClick={closeButtonHandle}
                      >
                        {closeButtonText}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
