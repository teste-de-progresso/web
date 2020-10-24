import React from "react";
import { useHistory } from "react-router-dom";
import { MdHome } from "react-icons/md";

export const Navigator = ({
  needsConfirmation = false,
  customText,
  customIcon,
}) => {
  const history = useHistory();

  // TODO: Create dialog component
  const goHome = () => {
    if (needsConfirmation) {
      const awsner = window.confirm(
        "O progresso não foi salvo. Deseja sair sem salvar?"
      );

      if (!awsner) return;
    }

    history.push("/");
  };

  return (
    <div
      onClick={() => goHome()}
      className="flex text-lg cursor-pointer text-gray-800 hover:text-primary-dark"
    >
      {customIcon || <MdHome className="my-auto" />}
      <span className="pl-3">{customText || "Início"}</span>
    </div>
  );
};
