import React from "react";

export const BadConnection = () => (
  <div className="h-screen w-screen bg-primary-normal grid items-center text-center text-white">
    <div>
      <h1 className="font-bold text-lg">Ops... Tem algo errado.</h1>
      <h1 className="text-lg">Não foi possível estabelecer comunicação com o servidor principal.</h1>
    </div>
  </div>
);
