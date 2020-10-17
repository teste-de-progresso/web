import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { ReadQuestion } from "./ReadQuestion";
import { Navigator } from "../../widgets";

export const Show = () => {
  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <Navigator />
        <ReadQuestion id={id} />
      </main>
    </div>
  );
};
