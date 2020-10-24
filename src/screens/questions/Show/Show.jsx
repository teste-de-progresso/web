import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { gql, useQuery } from "@apollo/client";

import { ReadQuestion } from "../shared";
import { Navigator } from "../../../components";

const GET_QUESTION = gql`
  query($id: ID!) {
    objectiveQuestion(id: $id) {
      id
      instruction
      support
      body
      own
      authorshipYear
      difficulty
      explanation
      source
      bloomTaxonomy
      references
      checkType
      status
      createdAt
      updatedAt
      reviewer {
        id
        name
      }
      subject {
        id
        name
      }
      alternatives {
        correct
        text
      }
    }
  }
`;

export const Show = () => {
  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  const { loading, data } = useQuery(GET_QUESTION, {
    variables: {
      id: id,
    },
  });

  if (loading) return null;

  const questionData = data?.objectiveQuestion;

  const handleEditQuestion = () => history.push(`/question/${id}/edit`);

  const options = [
    {
      icon: <MdEdit className="my-auto" />,
      label: "Editar",
      action: handleEditQuestion,
    },
  ];

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <Navigator />
        <div className="m-auto max-w-screen-md py-2 flex flex-row-reverse">
          {options.map((option, index) => {
            return (
              <div
                className="flex text-lg cursor-pointer text-gray-800 hover:text-primary-dark pl-4"
                onClick={option.action}
                key={index}
              >
                {option.icon}
                <span className="pl-2">{option.label}</span>
              </div>
            );
          })}
        </div>
        <ReadQuestion questionData={questionData} />
      </main>
    </div>
  );
};
