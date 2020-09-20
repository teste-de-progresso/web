import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../widgets";
import { QuestionsList } from "./";
import { useUserContext } from "../../utils";

export const Home = () => {
  const history = useHistory();

  const handleNewQuestion = () => {
    history.push("/question/new");
  };

  const user = useUserContext();

  const isTeacher = (() => {
    if (user.userInfo !== true && user.userInfo.roles.length >= 1) {
      return user.userInfo.roles[0] === "teacher";
    }
    return false;
  })();

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <div>
          <QuestionsList />
          {isTeacher && (
            <div className="mb-3 lg:max-w-xs ml-auto flex justify-center">
              <Button onClick={handleNewQuestion} className="w-full">
                Registrar questão
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
