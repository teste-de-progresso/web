import React from "react";
import { useHistory } from "react-router-dom";
import { MdContentPaste } from "react-icons/md";

export const QuestionsListRefactor = ({
  questions,
  isLoading,
}) => {
  const history = useHistory();

  if (isLoading) {
    return (
      <div
        className="grid"
        style={{ placeItems: "center", height: "calc(100vh - 13rem)" }}
      >
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div
        className="grid text-gray-800"
        style={{ placeItems: "center", height: "calc(100vh - 13rem)" }}
      >
        <div className="text-center">
          <MdContentPaste className="text-6xl mx-auto" />
          <span className="text-lg">
            Não existem questões registradas para esses parametros.
          </span>
        </div>
      </div>
    );
  }

  function formatDate(stringDate) {
    return new Date(stringDate).toLocaleDateString();
  }

  const handleReviewPainel = (id) => history.push(`/question/${id}/review`);

  return (
    <div>
      <div className="grid gap-4 col-gap-8 w-full grid-cols-3">
        {questions.map((question) => (
          <div
            key={question.id}
            className="border-l-8 border-primary-light flex bg-white hover:bg-unifeso-50 hover:shadow-lg rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
          >
            <div
              className="flex flex-col w-full px-3 py-2"
              onClick={() => handleReviewPainel(question.id)}
            >
              <h2># {question.id}</h2>

              <div className="text-sm text-gray-700 flex flex-col flex-wrap justify-between">
                <span>Registrado em: {formatDate(question.createdAt)}</span>
                <span>Atualizado em: {formatDate(question.updatedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
