import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

export const QuestionsList = () => {
  const authenticationState = useSelector((state) => state.auth);
  const [queryInput, setQueryInput] = useState({
    userId: authenticationState.user.user_id,
    page: 1,
    limit: 10000,
  });

  const SEARCH_QUESTIONS = gql`
    query {
      searchObjectiveQuestions(page: ${queryInput.page}, limit: ${queryInput.limit}, userId: ${queryInput.userId}) {
        id
        introduction
        status
        updatedAt
        createdAt
      }
    }
  `;

  const [questions, setQuestions] = useState([]);

  useQuery(SEARCH_QUESTIONS, {
    onCompleted: (data) => {
      setQuestions(data.searchObjectiveQuestions);
    },
  });

  function formatDate(stringDate) {
    return new Date(stringDate).toLocaleDateString();
  }

  return (
    <div>
      {questions.map((question) => (
        <div
          key={question.id}
          className="border-l-8 border-green-400 mb-4 p-3 flex flex-col bg-gray-200 rounded max-w-xl shadow-lg hover:shadow-lg cursor-pointer"
        >
          <h2>Introdução: {question.introduction}</h2>

          <div className="text-sm text-gray-700 flex flex-wrap justify-between">
            <span>ID: {question.id}</span>
            <span>Registrado em: {formatDate(question.createdAt)}</span>
            <span>Atualizado em: {formatDate(question.updatedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
