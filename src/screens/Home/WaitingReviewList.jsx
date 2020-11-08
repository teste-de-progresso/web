import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client"
import { loader } from "graphql.macro"

import { Section } from "../../components"

export const WaitingReviewList = () => {
  return (
    <Section title="Aguardando Revisão">
      <QuestionGroupContent />
    </Section>
  )
};

const QuestionGroupContent = () => {
  const QUESTION_WAITING_REVIEW = loader("../../graphql/query/getQuestionWaitingReview.gql")

  const [questions, setQuestions] = useState([])

  const { loading } = useQuery(QUESTION_WAITING_REVIEW, {
    onCompleted: ({ myUser }) => {
      setQuestions(myUser.activeReviewRequests.map((reviewRequest) => {
        return reviewRequest.objective
      }))
    }
  });

  const history = useHistory();

  if (loading) {
    return (
      <div
        className="grid"
        style={{ placeItems: "center" }}
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
        style={{ placeItems: "center" }}
      >
        <div className="text-center">
          <span className="text-base">
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
    <div className="grid gap-4 col-gap-8 w-full grid-cols-3">
      {questions.map((question) => (
        <div
          key={question.id}
          className="border-l-8 border-primary-light flex bg-white hover:bg-unifeso-50 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
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
  );
}