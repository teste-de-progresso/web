import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { MdModeEdit, MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const EditIcon = styled(MdModeEdit)`
  margin: auto;
  font-size: 1.5rem;
`;

export const QuestionsList = () => {
  const authenticationState = useSelector((state) => state.auth);
  const [queryInput, setQueryInput] = useState({
    page: 1,
    limit: 10,
  });

  const SEARCH_QUESTIONS = gql`
    query {
      searchObjectiveQuestions(page: ${queryInput.page}, limit: ${queryInput.limit}, userId: ${authenticationState.user.user_id}) {
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

  const { handleSubmit, register } = useForm();

  const nextPage = () => {
    if (questions.length == queryInput.limit) {
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

  const updateLimit = (values) => {
    setQueryInput({
      limit: values.limit,
      page: queryInput.page,
    });
  };

  return (
    <div>
      <div class="flex flex-row m-5 justify-between">
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
            name="limit"
            ref={register}
            onChange={handleSubmit(updateLimit)}
            className="block appearance-none w-full bg-gray-300 p-1 border border-gray-200 rounded"
          >
            <option value={10}>Até 10 items</option>
            <option value={25}>Até 25 items</option>
            <option value={30}>Até 30 items</option>
          </select>
        </div>
        <input
          readOnly
          hidden
          value={queryInput.page}
          name="page"
          ref={register}
        />
      </div>
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
