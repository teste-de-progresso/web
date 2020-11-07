import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { MdModeEdit, MdContentPaste } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const EditIcon = styled(MdModeEdit)`
  margin: auto;
  font-size: 1.5rem;
`;

const SEARCH_QUESTIONS = gql`
  query($where: Where, $page: Int!, $limit: Int!) {
    objectives(where: $where) {
      payload(page: $page, limit: $limit) {
        nodes {
          id
          status
          updatedAt
          createdAt
          reviewer {
            id
            name
          }
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

export const QuestionsList = ({
  where,
  title,
}) => {
  const [page, setPage] = useState(1);
  const [limit,] = useState(9);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const changePage = (direction) => {
    if (!isLastPage && direction === "next") setPage(page + 1);
    if (!isFirstPage && direction === "previous") setPage(page - 1);
  };

  return (
    <div className="bg-gray-200 p-4 rounded my-2">
      <h2 className="text-gray-500 font-medium text-xl flex">
        <span>
          {title}
        </span>
        <div className="ml-auto text-base text-gray-700">
          <button
            onClick={() => changePage("previous")}
            className="p-2"
          >
            <FaArrowLeft/>
          </button>
          <span className="mb-2 m-auto">Pagina: {page}</span>
          <button
            onClick={() => changePage("next")}
            className="p-2"
          >
            <FaArrowRight />
          </button>
          <input readOnly hidden value={page} />
        </div>
      </h2>
      <hr className="border-t border-gray-400 m-px" />
      <div className="p-2">
        <QuestionsListContent
          page={page}
          limit={limit}
          where={where}
          setIsFirstPage={setIsFirstPage}
          setIsLastPage={setIsLastPage}
          editable
        /></div>
    </div>
  )
}

export const QuestionsListContent = ({
  page,
  limit,
  where,
  setIsFirstPage,
  setIsLastPage,
  editable
}) => {
  const [questions, setQuestions] = useState([]);
  const authenticationState = useSelector((state) => state.auth);

  const { loading } = useQuery(SEARCH_QUESTIONS, {
    onCompleted: ({ objectives }) => {
      setQuestions(objectives.payload.nodes);
      setIsFirstPage(objectives.payload.pageInfo.firstPage);
      if (objectives.payload.nodes.length) {
        setIsLastPage(objectives.payload.pageInfo.lastPage);
      } else {
        setIsLastPage(true)
      }
    },
    variables: {
      page: page,
      limit: limit,
      where: {
        userId: authenticationState.user.user_id,
        ...where,
      },
    },
  });

  function formatDate(stringDate) {
    return new Date(stringDate).toLocaleDateString();
  }

  const history = useHistory();

  const handleEditQuestion = (id) => history.push(`/question/${id}/edit`);
  const bandleShowQuestion = (id) => history.push(`/question/${id}/show`);

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
          <MdContentPaste className="text-4xl mx-auto" />
          <span className="text-base">
            Não existem questões registradas para esses parametros.
          </span>
        </div>
      </div>
    );
  }

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
              onClick={() => bandleShowQuestion(question.id)}
            >
              <h2># {question.id}</h2>

              <div className="text-sm text-gray-700 flex flex-col flex-wrap justify-between">
                <span>Registrado em: {formatDate(question.createdAt)}</span>
                <span>Atualizado em: {formatDate(question.updatedAt)}</span>
              </div>
            </div>

            <div
              className="bg-red-300 flex flex-col relative flex-grow justify-center"
              onClick={() => handleEditQuestion(question.id)}
            >
              {editable ? <div
                className="group-hover:block absolute bg-gray-300 hover:bg-primary-normal text-gray-500 hover:text-gray-100 hover:shadow-lg rounded-full p-2 cursor-pointer shadow-inner transition-all duration-500"
                style={{ left: "-1.5rem" }}
              >
                <EditIcon />
              </div> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
