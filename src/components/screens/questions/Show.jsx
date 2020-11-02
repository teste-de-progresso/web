import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { ReadQuestion } from "./ReadQuestion";
import { Navigator } from "../../widgets";

export const Show = () => {
  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  return (
    <div className="bg-gray-100 h-full w-full">
        <main className="h-full">
            <ReadQuestion id={id} />
      </main>
    </div>
  );
};
