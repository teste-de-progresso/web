import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { MdModeEdit } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Section, ListItem, Loading } from "../../components";

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
  const [limit] = useState(3);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const changePage = (direction) => {
    if (!isLastPage && direction === "next") setPage(page + 1);
    if (!isFirstPage && direction === "previous") setPage(page - 1);
  };

  return (
    <Section title={(
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
          <span className="mb-2 m-auto">
            Pagina:
            {page}
          </span>
          <button
            onClick={() => changePage("next")}
            className="p-2"
          >
            <FaArrowRight />
          </button>
          <input readOnly hidden value={page} />
        </div>
      </div>
    )}
    >
      <QuestionsListContent
        page={page}
        limit={limit}
        where={where}
        setIsFirstPage={setIsFirstPage}
        setIsLastPage={setIsLastPage}
        editable={editable}
      />
    </Section>
  );
};

export const QuestionsListContent = ({
  page,
  limit,
  where,
  setIsFirstPage,
  setIsLastPage,
  editable = false,
}) => {
  const SEARCH_QUESTIONS = loader("../../graphql/query/getQuestions.gql");
  const [questions, setQuestions] = useState([]);

  const { loading } = useQuery(SEARCH_QUESTIONS, {
    onCompleted: ({ questions: result }) => {
      setQuestions(result.payload.nodes);
      setIsFirstPage(result.payload.pageInfo.firstPage);
      if (result.payload.nodes.length) {
        setIsLastPage(result.payload.pageInfo.lastPage);
      } else {
        setIsLastPage(true);
      }
    },
    variables: {
      page,
      limit,
      where: {
        ...where,
      },
    },
  });

  function formatDate(stringDate) {
    return new Date(stringDate).toLocaleDateString();
  }

  const history = useHistory();

  const handleEditQuestion = (id) => history.push(`/question/${id}/edit`);
  const bandleShowQuestion = (id) => history.push(`/question/${id}`);

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
          <ListItem
            key={`question-${question.uuid}`}
            onClick={() => bandleShowQuestion(question.uuid)}
            icon={editable && (<EditIcon />)}
            iconClick={() => handleEditQuestion(question.uuid)}
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
    </div>
  );
};
