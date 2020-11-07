import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { MdEdit, MdSave } from "react-icons/md";
import { gql, useQuery, useMutation } from "@apollo/client";

import { ReadQuestion } from "../shared";
import { Navigator } from "../../../components";

const Item = ({ children, className }) => (
  <li className={`hover:text-white ${className || ""}`}>
    {children}
  </li >
)

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

const FINISH_QUESTION = gql`
  mutation ($questionId: ID!) {
    finishQuestion (
      input: {
        questionId: $questionId
      }
    ) {
      payload {
        id
        status
      }
    }
  }
`

export const Show = () => {
  const { id: questionId } = useParams();
  const history = useHistory();

  const [finishQuestion] = useMutation(FINISH_QUESTION)

  if (!questionId) history.push("/");

  const { loading, data } = useQuery(GET_QUESTION, {
    variables: {
      id: questionId,
    },
  });

  if (loading) return null;

  const { objectiveQuestion: questionData } = data;

  const handleEditQuestion = () => {
    const confirmEdition = () => window.confirm(
      "Alterar uma questão registrada irá requerir uma revisão da quetão, deseja realmente editar?"
    )

    if (questionData.status !== 'finished' || confirmEdition()) {
      history.push(`/question/${questionId}/edit`)
    }
  }

  const handleRegisterQuestion = () => {
    finishQuestion({
      variables: {
        questionId: questionId
      },
    })
  }

  const options = [
    {
      icon: <MdEdit className="my-auto" />,
      label: "Editar",
      action: handleEditQuestion,
    },
  ];

  if (questionData.status === 'approved') {
    options.push(
      {
        icon: <MdSave className="my-auto" />,
        label: "Registrar",
        action: handleRegisterQuestion,
      }
    )
  }

  return (
    <>
      <Navigator home={true}>
        {options.map((option, index) => {
          return (
            <Item className={index === 0 ? "ml-auto" : ""}
              key={index}
            >
              <div
                onClick={option.action}
              >
                {option.icon}
                <span className="pl-3">{option.label}</span>
              </div>
            </Item>
          );
        })}
      </Navigator>
      <div className="bg-gray-100 w-full my-2">
        <main>
          <ReadQuestion questionData={questionData} />
        </main>
      </div>
    </>
  );
};
