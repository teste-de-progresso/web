import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { MdModeEdit } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

import { Section } from "../../components";

const EditIcon = styled(MdModeEdit)`
  margin: auto;
  font-size: 1.5rem;
`;

export const QuestionsGroup = ({
  where,
  title,
  editable,
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
    <Section title={
      <div className="flex">
        <span>
          {title}
        </span>
        <div className="ml-auto text-base text-gray-700">
          <button
            onClick={() => changePage("previous")}
            className="p-2"
          >
            <FaArrowLeft />
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
      </div>
    }>
      <QuestionsListContent
        page={page}
        limit={limit}
        where={where}
        setIsFirstPage={setIsFirstPage}
        setIsLastPage={setIsLastPage}
        editable={editable}
      />
    </Section>
  )
}

export const QuestionsListContent = ({
  page,
  limit,
  where,
  setIsFirstPage,
  setIsLastPage,
  editable = false
}) => {
  const SEARCH_QUESTIONS = loader("../../graphql/query/getQuestions.gql")
  const [questions, setQuestions] = useState([]);
  const authenticationState = useSelector((state) => state.auth);

  const { loading } = useQuery(SEARCH_QUESTIONS, {
    onCompleted: ({ questions }) => {
      setQuestions(questions.payload.nodes);
      setIsFirstPage(questions.payload.pageInfo.firstPage);
      if (questions.payload.nodes.length) {
        setIsLastPage(questions.payload.pageInfo.lastPage);
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
            className="border-l-8 border-primary-light flex bg-white hover:bg-unifeso-50 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
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
              {editable && <div
                className="group-hover:block absolute bg-gray-300 hover:bg-primary-normal text-gray-500 hover:text-gray-100 hover:shadow-lg rounded-full p-2 cursor-pointer shadow-inner transition-all duration-500"
                style={{ left: "-1.5rem" }}
              >
                <EditIcon />
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
