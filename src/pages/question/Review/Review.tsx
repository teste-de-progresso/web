import React, {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";

import {ViewMode, ViewModeFragments, Feedbacks, FeedbacksFragments} from "../shared";
import {Card, Button, Navigator} from "../../../components";
import {REVIEW_FEEDBACK} from "../../../utils/types";
import {Query, Question, ReviewMessageFeedbackType} from "../../../__generated__/graphql-schema";
import {NodeId} from "../../../utils/graphql";
import {QuestionRoutePaths} from "../../../routes";
import { Prompt } from 'react-router'

const GET_QUESTION = gql`
    ${ViewModeFragments}
    ${FeedbacksFragments}
    query Question($id: ID!) {
        node(id: $id) {
            __typename
            ... on Question {
                id
                ... QuestionReadOnlyFields
                reviewFeedbacks {
                    ... ReviewMessagesFields
                }
            }
        }
    }
`

const CREATE_FEEDBACK_MUTATION = gql`
    mutation($questionId: ID!, $status: FeedbackStatus!, $comment: String) {
        createFeedback(
            input: {
                feedback: {
                    questionId: $questionId
                    status: $status
                    comment: $comment
                }
            }
        ) {
            feedback {
                id
            }
            errors
        }
    }
`

type Params = {
  id: string
}

export const Review: FC = () => {
  const history = useHistory()
  const {id} = useParams<Params>()
  const [isChangesSaved, setIsChangesSaved] = useState(true)
  const {register, handleSubmit} = useForm()
  const [sendFeedback] = useMutation(CREATE_FEEDBACK_MUTATION)
  const {loading, data} = useQuery<Query>(GET_QUESTION, {
    variables: {
      id,
    },
    fetchPolicy: "network-only"
  })
  const question = data?.node as Question | null

  if (loading || !question) return null;

  type FormInputs = {
    status: ReviewMessageFeedbackType
    comment: string
  }

  const formSubmit = async (inputs: FormInputs) => {
    await sendFeedback({
      variables: {
        ...inputs,
        questionId: NodeId.decode(question.id).id,
      },
    });

    history.push(QuestionRoutePaths.index)
  };

  return (
    <>
      <Navigator home/>
      <Prompt
        when={!isChangesSaved}
        message='O parecer ainda não foi enviado, deseja continuar?'
      />
      <div className="bg-gray-100 h-full w-full my-2">
        <main className="flex px-5 max-w-screen-xl m-auto">
          <div className="w-3/5">
            <ViewMode questionData={question}/>
          </div>
          <div className="w-2/5 ml-3">
            <FeedbackForm handleSubmit={handleSubmit} formSubmit={formSubmit} register={register} setIsChangesSaved={setIsChangesSaved}/>
            <div className="my-3"/>
            <Feedbacks feedbacks={question.reviewMessages}/>
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
  setIsChangesSaved: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const FeedbackForm: FC<FeedbackFormProps> = ({handleSubmit, formSubmit, register, setIsChangesSaved}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    if (e.target.value !== ''){
      setIsChangesSaved(false)
    }else{
      setIsChangesSaved(true)
    }
  }

  const handleSubmitClick = ()=>{
    setIsChangesSaved(true)
  }

  return(
  <Card title="Parecer" className="max-w-screen-md mx-auto">
    <form onSubmit={handleSubmit(formSubmit)}>
      <textarea
        onChange={(e) => handleTextChange(e)}
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
            ref={register({required: true})}
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
          Enviar Parecer
        </Button>
      </div>
    </form>
  </Card>
)};
