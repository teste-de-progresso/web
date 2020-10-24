import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import { ReadQuestion } from "../Shared";
import { Card, Button, Navigator } from "../../../components";
import { REVIEW_FEEDBACK } from "../../../utils/types";

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

  const [sendFeedback] = useMutation(SUBMIT_REVIEW);
  const { register, handleSubmit } = useForm();

  const formSubmit = async (inputs) => {
    await sendFeedback({
      variables: {
        questionId: id,
        ...inputs,
      },
    });

    history.push("/");
  };

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <Navigator />
        <ReadQuestion id={id} />
        <Card title="Feedback de revisão" className="max-w-screen-md mx-auto">
          <form onSubmit={handleSubmit(formSubmit)}>
            <textarea
              className="w-full h-32 p-2 border-solid border-2 border-gray-700 rounded-md"
              ref={register}
              name="comment"
            />
            {REVIEW_FEEDBACK.map((item, index) => {
              return (
                <div key={index} className="flex">
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
  );
};
