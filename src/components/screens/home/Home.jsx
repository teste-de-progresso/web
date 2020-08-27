import React from "react";
import { useHistory } from "react-router-dom";
import { QuestionsList } from "./QuestionsList";
import { Button } from "../../widgets/Button";

export const Home = () => {
  const history = useHistory();

  const handleNewQuestion = () => {
    history.push("/question/new");
  };

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <div>
          <QuestionsList />
          <div className="mb-3 max-w-xs ml-auto">
            <Button onClick={handleNewQuestion}>Registrar questão</Button>
          </div>
        </div>
      </main>
    </div>
  );
};
