import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";

import { ReadQuestion } from "../shared";
import { Card, Button, Navigator } from "../../../components";
import { REVIEW_FEEDBACK } from "../../../utils/types";

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

const SUBMIT_REVIEW = gql`
  mutation($questionId: ID!, $status: FeedbackStatus!, $comment: String) {
    sendFeedback(
      input: {
        feedback: {
          questionId: $questionId
          status: $status
          comment: $comment
        }
      }
    ) {
      payload {
        id
      }
    }
  }
`;

export const Review = () => {
  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  const { loading, data } = useQuery(GET_QUESTION, {
    variables: {
      id: id,
    },
  });

  const [sendFeedback] = useMutation(SUBMIT_REVIEW);
  const { register, handleSubmit } = useForm();

  if (loading) return null;

  const { objectiveQuestion: questionData } = data;

  const formSubmit = async (inputs) => {
    await sendFeedback({
      variables: {
        questionId: id,
        ...inputs,
      },
    });

    window.location = "/"
  };

  return (
    <>
      <Navigator home={true} />
      <div className="bg-gray-100 h-full w-full my-2">
        <main className="h-full pb-4">
          <ReadQuestion questionData={questionData} />
          <Card title="Feedback de revisão" className="max-w-screen-md mx-auto">
            <form onSubmit={handleSubmit(formSubmit)}>
              <textarea
                className="w-full h-32 p-2 border-solid border-2 border-gray-700 rounded-md"
                ref={register}
                name="comment"
              />
              {REVIEW_FEEDBACK.map((item, index) => {
                return (
                  <div key={index} className="flex mb-2">
                    <input
                      type="radio"
                      id={item.value}
                      name="status"
                      ref={register({ required: true })}
                      value={item.value}
                      className="my-auto"
                      defaultChecked={index === 0}
                    />
                    <label
                      htmlFor={item.value}
                      className="flex flex-col pl-2 w-full"
                    >
                      {item.label}
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </label>
                  </div>
                );
              })}
              <Button type="submit" className="mt-4">
                Submeter Feedback
            </Button>
            </form>
          </Card>
        </main>
      </div>
    </>
  );
};
