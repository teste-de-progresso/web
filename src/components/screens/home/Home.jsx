import React from "react";
import { useHistory } from "react-router-dom";
import { QuestionsList } from "./QuestionsList";
import { Button } from "../../widgets/Button";

import { Navbar } from "../../layout/Navbar";
import { Footer } from "../../layout/Footer";

export const Home = () => {
  const history = useHistory();

  const handleNewQuestion = () => {
    history.push("/question/new");
  };

  return (
    <>
      <Navbar />
      <div className="bg-primary-normal h-full w-full">
        <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
          <div>
            <div className="mb-3 max-w-xs">
              <Button onClick={handleNewQuestion}>Registrar questão</Button>
            </div>
            <QuestionsList />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
