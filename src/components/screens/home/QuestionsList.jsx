import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { MdModeEdit, MdContentPaste } from "react-icons/md";

const EditIcon = styled(MdModeEdit)`
  margin: auto;
  font-size: 1.5rem;
`;

const SEARCH_QUESTIONS = gql`
  query($where: OjectiveWhereInput, $page: Int!, $limit: Int!) {
    objectives(where: $where) {
      payload(page: $page, limit: $limit) {
        nodes {
          id
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

export const QuestionsList = ({
  userId,
  page,
  limit,
  where,
  setIsFirstPage,
  setIsLastPage,
}) => {
  const [questions, setQuestions] = useState([]);

  const { loading } = useQuery(SEARCH_QUESTIONS, {
    onCompleted: ({ objectives }) => {
      setQuestions(objectives.payload.nodes);
      setIsFirstPage(objectives.payload.pageInfo.firstPage);
      setIsLastPage(objectives.payload.pageInfo.lastPage);
    },
    variables: {
      page: page,
      limit: limit,
      userId: userId,
      ...where,
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
      <div className="grid h-full" style={{ placeItems: "center" }}>
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

  if (questions.length === 0){
    return (
      <div className="grid h-full text-gray-800" style={{ placeItems: "center" }}>
        <div className="text-center">
          <MdContentPaste className="text-6xl mx-auto"/>
          <span className="text-lg">
            Não existem questões registradas para esses parametros.
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 col-gap-8 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
      {questions.map((question) => (
        <div
          key={question.id}
          className="border-l-8 border-primary-light flex bg-white hover:bg-gray-200 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
        >
          <div
            className="flex flex-col w-full p-3"
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
  );
};
