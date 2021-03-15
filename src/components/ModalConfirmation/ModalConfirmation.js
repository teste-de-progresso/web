import React from "react";

export const ModalConfirmation = ({
  title, text, onConfirmationClick, onCloseModal,
}) => {
  const handleBackClick = () => {
    onCloseModal(false);
  };

  const handleConfirmClick = () => {
    onConfirmationClick();
  };

  return (
    <>
      <div className="fixed items-center flex justify-center top-0 w-full h-full overflow-auto bg-transparent z-50">
        <div className="h-auto w-full sm:w-2/6 p-4 bg-white shadow-md rounded">
          <div className="mb-3 text-2xl ">
            {title}
          </div>
          <hr className="mb-4" />
          <div className="text-base mb-4">
            {text}
          </div>
          <div className="flex flex-row-reverse">
            <button onClick={handleConfirmClick} className="ml-4 text-white rounded bg-primary-normal hover:bg-primary-dark p-2">
              Confirmar
            </button>
            <button className="text-red-600 hover:text-red-800" onClick={handleBackClick}>
              Voltar
            </button>
          </div>
        </div>
      </div>
      <div className="fixed items-center flex justify-center top-0 w-full h-full overflow-auto bg-black z-40 opacity-50" />
    </>
  );
};

export default ModalConfirmation;
