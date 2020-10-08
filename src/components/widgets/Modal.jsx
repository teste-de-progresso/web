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
    <>
      <div className="absolute z-20 inset-0 bg-gray-500 opacity-75"></div>

      <div className="fixed inset-0 z-30 transition-opacity">
        <div className="grid h-screen" style={{ placeItems: "center" }}>
          <div
            className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-screen overflow-auto">
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
    </>
  );
};
