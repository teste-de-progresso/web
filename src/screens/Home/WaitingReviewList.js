import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { Section, Loading, ListItem } from "../../components";

export const WaitingReviewList = () => (
  <Section title="Aguardando sua revisão">
    <QuestionGroupContent />
  </Section>
);

const QuestionGroupContent = () => {
  const QUESTION_WAITING_REVIEW = loader("../../graphql/query/getQuestionWaitingReview.gql");

  const [questions, setQuestions] = useState([]);

  const { loading } = useQuery(QUESTION_WAITING_REVIEW, {
    onCompleted: ({ currentUser }) => {
      setQuestions(currentUser.activeReviewRequests.map((reviewRequest) => reviewRequest.question));
    },
  });

  const history = useHistory();

  if (loading) {
    return (
      <Loading />
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
            Nenhuma questão registrada.
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
        <ListItem
          key={`question-${question.uuid}`}
          onClick={() => handleReviewPainel(question.uuid)}
          header={`# ${question.id}`}
        >
          <div className="text-sm text-gray-700 flex flex-col flex-wrap justify-between">
            <span>
              Registrado em:
              {" "}
              {formatDate(question.createdAt)}
            </span>
            <span>
              Atualizado em:
              {" "}
              {formatDate(question.updatedAt)}
            </span>
          </div>
        </ListItem>
      ))}
    </div>
  );
};
