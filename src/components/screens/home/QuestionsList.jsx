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

const SEARCH_QUESTIONS = gql`
  query($page: Int!, $limit: Int!, $userId: Int!) {
    objectiveQuestions {
      payload(page: $page, limit: $limit, where: { userId: $userId }) {
        nodes {
          id
          introduction
          status
          updatedAt
          createdAt
        }
        pageInfo {
          totalPages
          firstPage
          lastPage
        }
      }
    }
  }
`;

const resultLimits = [5, 10, 15, 20, 30, 40, 50];

export const QuestionsList = () => {
  const authenticationState = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [questions, setQuestions] = useState([]);

  useQuery(SEARCH_QUESTIONS, {
    onCompleted: (data) => {
      setQuestions(data.objectiveQuestions.payload.nodes);
      setIsFirstPage(data.objectiveQuestions.payload.pageInfo.firstPage);
      setIsLastPage(data.objectiveQuestions.payload.pageInfo.lastPage);
    },
    variables: {
      page: page,
      limit: limit,
      userId: authenticationState.user.user_id,
    },
  });

  function formatDate(stringDate) {
    return new Date(stringDate).toLocaleDateString();
  }

  const history = useHistory();

  const handleEditQuestion = (id) => history.push(`/question/${id}/edit`);
  const bandleShowQuestion = (id) => history.push(`/question/${id}/show`);

  const changePage = (direction) => {
    if (!isLastPage && direction === "next") setPage(page + 1);
    if (!isFirstPage && direction === "previous") setPage(page - 1);
  };

  return (
    <div>
      <div className="flex flex-row m-5 justify-between">
        <div className="bg-gray-200">
          <button
            onClick={() => changePage("previous")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l p-2  "
          >
            <MdNavigateBefore />
          </button>
          <span className="p-2 m-auto">Pagina: {page}</span>
          <button
            onClick={() => changePage("next")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r p-2"
          >
            <MdNavigateNext />
          </button>
        </div>
        <div>
          <select
            defaultValue={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="block appearance-none w-full bg-gray-300 p-1 border border-gray-200 rounded"
          >
            {resultLimits.map((item, index) => {
              return (
                <option key={index} value={item}>
                  Até {item} items
                </option>
              );
            })}
          </select>
        </div>
        <input readOnly hidden value={page} />
      </div>
      <div className="grid gap-1 lg:space-x-8 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {questions.map((question) => (
          <div
            key={question.id}
            className="border-l-8 border-primary-light mb-4 flex flex-row bg-white hover:bg-gray-200 rounded max-w-xl shadow hover:shadow-md cursor-pointer group transition-all duration-500"
          >
            <div
              className="flex flex-col w-full p-3"
              onClick={() => bandleShowQuestion(question.id)}
            >
              <h2>{question.introduction}</h2>

              <div className="text-sm text-gray-700 flex flex-col flex-wrap justify-between">
                <span>ID: {question.id}</span>
                <span>Registrado em: {formatDate(question.createdAt)}</span>
                <span>Atualizado em: {formatDate(question.updatedAt)}</span>
              </div>
            </div>

            <div
              className="bg-red-300 flex flex-col relative flex-grow justify-center"
              onClick={() => handleEditQuestion(question.id)}
            >
              <div
                className="group-hover:block absolute bg-gray-300 hover:bg-primary-normal text-gray-500 hover:text-gray-100 hover:shadow-lg rounded-full p-2 cursor-pointer shadow-inner transition-all duration-500"
                style={{ left: "-1.5rem" }}
              >
                <EditIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
