import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { ReadQuestion } from "../shared";
import { Card, Button, Navigator } from "../../../components";
import { REVIEW_FEEDBACK } from "../../../utils/types";

export const Review = () => {
  const GET_QUESTION = loader("../../../graphql/query/getQuestion.gql");
  const SUBMIT_REVIEW = loader("../../../graphql/mutation/sendQuestionFeedback.gql");

  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  const { loading, data } = useQuery(GET_QUESTION, {
    variables: {
      id,
    },
  });

  const [sendFeedback] = useMutation(SUBMIT_REVIEW);
  const { register, handleSubmit } = useForm();

  if (loading) return null;

  const { question: questionData } = data;

  const formSubmit = async (inputs) => {
    await sendFeedback({
      variables: {
        questionId: id,
        ...inputs,
      },
    });

    window.location = "/";
  };

  return (
    <>
      <Navigator home />
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
              {REVIEW_FEEDBACK.map((item, index) => (
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
              ))}
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
