import { Prompt } from "react-router";
import React, { FC, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Mutation, Question, ReviewMessageFeedbackType } from "../../../../__generated__/graphql-schema";
import { NodeId } from "../../../../utils/graphql";
import { Button, Card } from "../../../../components";
import { useUserContext } from "../../../../contexts";

export const REVIEW_FEEDBACK = [
  {
    label: "Aprovada",
    description: "A questão está pronta para registro e não deve mais ser alterada.",
    value: "approve",
  },
  {
    label: "Pendente de Alterações",
    description: "O autor deve efetuar as alterações solicitadas e reenviar a questão ao revisor.",
    value: "request_changes",
  },
];

export const ReviewMessageFormFragments = gql`
  fragment ReviewMessageForm_question on Question {
    id
    status
    user {
      id
    }
  }
`

const CREATE_REVIEW_MESSAGE_MUTATION = gql`
  mutation($questionId: ID!, $feedbackType: ReviewMessageFeedbackType!, $text: String!) {
      createReviewMessage(
          input: {
              message: {
                  questionId: $questionId
                  feedbackType: $feedbackType
                  text: $text
              }
          }
      ) {
          reviewMessage {
              id
          }
      }
  }
`

export const ReviewMessageForm: FC<{ question: Question }> = ({ question }) => {
  const [isChangesSaved, setIsChangesSaved] = useState(true)
  const { register, handleSubmit } = useForm()
  const { user } = useUserContext()

  const [createReviewMessage] = useMutation<Mutation['createReviewMessage']>(CREATE_REVIEW_MESSAGE_MUTATION)

  const hasFeebacks = !!question.reviewMessages.nodes.length
  const questionIsFromCurrentUser = user?.id === question.user.id

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== '') {
      setIsChangesSaved(false)
    } else {
      setIsChangesSaved(true)
    }
  }

  const handleSubmitClick = () => {
    setIsChangesSaved(true)
  }

  const formSubmit = async (inputs: {
    feedbackType: ReviewMessageFeedbackType
    text: string
  }) => {
    await createReviewMessage({
      variables: {
        text: inputs.text,
        feedbackType: questionIsFromCurrentUser ? 'comment' : inputs.feedbackType,
        questionId: NodeId.decode(question.id).id,
      },
    });

    window.location.reload()
  };

  if (!hasFeebacks && questionIsFromCurrentUser) return null

  return (
    <>
      <Prompt
        when={!isChangesSaved}
        message='O parecer ainda não foi enviado, deseja continuar?'
      />
      <Card title="Parecer" className="max-w-screen-md mx-auto">
        <form onSubmit={handleSubmit(formSubmit)}>
          <textarea
            onChange={(e) => handleTextChange(e)}
            className="w-full h-32 p-2 border-solid border-2 border-gray-700 rounded-md"
            ref={register}
            name="text"
          />
          {!questionIsFromCurrentUser && REVIEW_FEEDBACK.map((item, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="radio"
                id={item.value}
                name="feedbackType"
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
          <div className="justify-end flex">
            <Button type="primary" htmlType="submit" className="mt-4" onClick={handleSubmitClick}>
              {questionIsFromCurrentUser ? 'Responder Parecer' : 'Enviar Parecer'}
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
};
