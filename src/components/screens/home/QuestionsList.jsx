import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";

const EditIcon = styled(MdModeEdit)`
  margin: auto;
  font-size: 1.5rem;
`;

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

  const history = useHistory();

  const handleEditQuestion = (id) => {
    history.push(`/question/${id}/edit`);
  };

  const bandleShowQuestion = (id) => {
    history.push(`/question/${id}/show`);
  };

  return (
    <div>
      {questions.map((question) => (
        <div
          key={question.id}
          className="border-l-8 border-green-400 mb-4 flex flex-row bg-gray-200 rounded max-w-xl shadow hover:shadow-lg cursor-pointer"
        >
          <div
            className="flex flex-col w-full  p-3"
            onClick={() => bandleShowQuestion(question.id)}
          >
            <h2>Introdução: {question.introduction}</h2>

            <div className="text-sm text-gray-700 flex flex-wrap justify-between">
              <span>ID: {question.id}</span>
              <span>Registrado em: {formatDate(question.createdAt)}</span>
              <span>Atualizado em: {formatDate(question.updatedAt)}</span>
            </div>
          </div>

          <div
            className="p-2 content-center bg-gray-300 rounded flex flex-col hover:shadow-2xl shadow-inner"
            onClick={() => handleEditQuestion(question.id)}
          >
            <EditIcon />
          </div>
        </div>
      ))}
    </div>
  );
};
