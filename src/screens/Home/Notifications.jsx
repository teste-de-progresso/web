import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const WAITING_REVIEW_QUESTIONS = gql`
  query {
    myUser {
      activeReviewRequests {
        question {
          id
          user {
            name
            email
          }
          subject {
            name
          }
        }
      }
    }
  }
`;

const Notifications = () => {
  const { data } = useQuery(WAITING_REVIEW_QUESTIONS);

  const activeReviewRequests = data?.myUser?.activeReviewRequests;

  const history = useHistory();

  if (!activeReviewRequests || activeReviewRequests.lenght === 0) {
    return null;
  }

  return (
    <div className="max-w-xs">
      <ul>
        {activeReviewRequests.map(({ question }, index) => {
          console.log(question);
          return (
            <li
              key={index}
              className="border-2 border-primary-light flex bg-white hover:bg-gray-200 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
              onClick={() => history.push(`/question/${question.id}/review`)}
            >
              <div className="flex flex-col w-full p-3">
                <p>
                  {question.user.name || question.user.email} escolheu você como
                  revisor da questão {question.id} ({question.subject.name}).
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
