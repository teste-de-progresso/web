import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import { ViewMode, QuestionFeedback } from "../shared";
import { Card, Button, Navigator } from "../../../components";
import { REVIEW_FEEDBACK } from "../../../utils/types";
import { FeedbackStatus, Query, Question } from "../../../graphql/__generated__/graphql-schema";

const GET_QUESTION = gql`
  query ($uuid: ID!) {
    question (uuid: $uuid) {
      id
      uuid
      instruction
      support
      body
      alternatives {
        correct
        text
      }
      explanation
      references
      source
      authorshipYear
      difficulty
      checkType
      bloomTaxonomy
      subject {
        name
        axis {
          name
        }
        category {
          name
        }
      }
      status
      reviewer {
        id
        name
      }
      reviewFeedbacks {
        id
        status
        comment
        user {
          name
          avatarUrl
        }
      }
      updatedAt
      createdAt
    }
  }
`

const SUBMIT_REVIEW_MUTATION = gql`
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
`

type Params = {
  uuid: string
}

export const Review: FC = () => {
  const [question, setQuestion] = useState<Question>()
  const { uuid } = useParams<Params>();
  const history = useHistory();

  if (!uuid) history.push("/");

  const { loading } = useQuery<Query>(GET_QUESTION, {
    variables: {
      uuid,
    },
    onCompleted: ({ question }) => {
      setQuestion(question as Question)
    }
  });

  const [sendFeedback] = useMutation(SUBMIT_REVIEW_MUTATION);
  const { register, handleSubmit } = useForm();

  if (loading || !question) return null;

  type FormInputs = {
    status: FeedbackStatus
    comment: string
  }

  const formSubmit = async (inputs: FormInputs) => {
    await sendFeedback({
      variables: {
        questionId: question.id,
        ...inputs,
      },
    });

    window.location.href = "/";
  };

  return (
    <>
      <Navigator home />
      <div className="bg-gray-100 h-full w-full my-2">
        <main className="flex px-5 max-w-screen-xl m-auto">
          <div className="w-3/5">
            <ViewMode questionData={question} />
          </div>
          <div className="w-2/5 ml-3">
            <FeedbackForm handleSubmit={handleSubmit} formSubmit={formSubmit} register={register} />
            <div className="my-3" />
            <QuestionFeedback feedbacks={question.reviewFeedbacks} />
          </div>
        </main>
      </div>
    </>
  );
};

type FeedbackFormProps = {
  handleSubmit: any
  formSubmit: any
  register: any
}

const FeedbackForm: FC<FeedbackFormProps> = ({ handleSubmit, formSubmit, register }) => (
  <Card title="Parecer" className="max-w-screen-md mx-auto">
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
        Enviar Parecer
      </Button>
    </form>
  </Card>
);
