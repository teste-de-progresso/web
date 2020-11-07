import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client"

import { Navigator } from "../../components";
import { useAuth } from "../../utils/contexts";
import { QuestionsList } from "./QuestionsList";
import { QuestionsListRefactor } from "./QuestionListRefactor";

const QUESTION_WAITING_REVIEW = gql`
  query {
    myUser {
      activeReviewRequests {
        objective {
          id
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const Home = () => {
  const auth = useAuth();
  const [questionWaitingToReview, setQuestionWaitingToReview] = useState([])

  const { loading: isLoadingWaitingReview } = useQuery(QUESTION_WAITING_REVIEW, {
    onCompleted: ({ myUser }) => {
      setQuestionWaitingToReview(myUser.activeReviewRequests.map((reviewRequest) => {
        return reviewRequest.objective
      }))
    }
  });

  return (
    <>
      {auth.isTeacher() &&
        <Navigator newQuestion={true} />
      }
      <div className="bg-gray-100 w-full">
        <main className="px-8 rounded-t-xlg">
          <div className="mr-4">
            <div className="bg-gray-200 p-4 rounded my-2">
              <h2 className="text-gray-500 font-medium text-xl">Aguardando Revisão</h2>
              <hr className="border-t border-gray-400 m-px" />
              <div className="p-2">
                <QuestionsListRefactor isLoading={isLoadingWaitingReview} questions={questionWaitingToReview} />
              </div>
            </div>
            <div className="bg-gray-200 p-4 rounded my-2">
              <h2 className="text-gray-500 font-medium text-xl">Rascunhos</h2>
              <hr className="border-t border-gray-400 m-px" />
              <div className="p-2">
                <QuestionsList where={{}} limit={3} page={1} userId={auth.user.userId} setIsFirstPage={() => { }} setIsLastPage={() => { }} editable={true} />
              </div>
            </div>
            <div className="bg-gray-200 p-4 rounded my-2">
              <h2 className="text-gray-500 font-medium text-xl">Aprovadas</h2>
              <hr className="border-t border-gray-400 m-px" />
              <div className="p-2">
                <QuestionsList where={{}} limit={4} page={1} userId={auth.user.userId} setIsFirstPage={() => { }} setIsLastPage={() => { }} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
