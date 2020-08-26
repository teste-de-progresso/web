import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { MdModeEdit, MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const EditIcon = styled(MdModeEdit)`
  margin: auto;
  font-size: 1.5rem;
`;

export const QuestionsList = () => {
  const authenticationState = useSelector((state) => state.auth);
  const [queryInput, setQueryInput] = useState({
    page: 1,
    limit: 5,
  });

  const SEARCH_QUESTIONS = gql`
    query($page: Int!, $limit: Int!, $userId: Int!) {
      searchObjectiveQuestions(page: $page, limit: $limit, userId: $userId) {
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
    variables: {
      page: queryInput.page,
      limit: queryInput.limit,
      userId: authenticationState.user.user_id,
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

  const nextPage = () => {
    if (questions.length === queryInput.limit) {
      setQueryInput({
        limit: queryInput.limit,
        page: queryInput.page + 1,
      });
    }
  };

  const returnPage = () => {
    if (queryInput.page > 1) {
      setQueryInput({
        limit: queryInput.limit,
        page: queryInput.page - 1,
      });
    }
  };

  const updateLimit = (value) => {
    setQueryInput({
      limit: Number(value),
      page: 1,
    });
  };

  return (
    <div>
      <div className="flex flex-row m-5 justify-between">
        <div className="bg-gray-200">
          <button
            onClick={() => returnPage()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l p-2  "
          >
            <MdNavigateBefore />
          </button>
          <span className="p-2 m-auto">Pagina: {queryInput.page}</span>
          <button
            onClick={() => nextPage()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r p-2"
          >
            <MdNavigateNext />
          </button>
        </div>
        <div>
          <select
            defaultValue={queryInput.limit}
            onChange={(e) => updateLimit(e.target.value)}
            className="block appearance-none w-full bg-gray-300 p-1 border border-gray-200 rounded"
          >
            <option value={10}>Até 5 items</option>
            <option value={25}>Até 10 items</option>
            <option value={30}>Até 20 items</option>
          </select>
        </div>
        <input readOnly hidden value={queryInput.page} />
      </div>
      <div className="grid grid-cols-5 space-x-8">
        {questions.map((question) => (
            <div
                key={question.id}
                className="border-l-8 border-primary-light mb-4 flex flex-row bg-white hover:bg-gray-200 rounded max-w-xl shadow hover:shadow-md cursor-pointer group transition-all duration-500"
            >
              <div
                  className="flex flex-col w-full p-3"
                  onClick={() => bandleShowQuestion(question.id)}
              >
                <h2>Introdução: {question.introduction}</h2>

                <div className="text-sm text-gray-700 flex flex-col flex-wrap justify-between">
                  <span>ID: {question.id}</span>
                  <span>Registrado em: {formatDate(question.createdAt)}</span>
                  <span>Atualizado em: {formatDate(question.updatedAt)}</span>
                </div>
              </div>

              <div
                  className="bg-red-300 flex flex-col relative flex-grow justify-center"
                  onClick={() => handleEditQuestion(question.id)}>
                <div className="group-hover:block absolute bg-gray-300 hover:bg-primary-normal text-gray-500 hover:text-gray-100 hover:shadow-lg rounded-full p-2 cursor-pointer shadow-inner transition-all duration-500" style={{left: '-1.5rem'}}>
                  <EditIcon />
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};
