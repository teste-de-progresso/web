import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client"
import { FaFilter } from "react-icons/fa";

import { Navigator, Modal } from "../../components";
import { useAuth } from "../../utils/contexts";
import { QuestionsList } from "./QuestionsList";
import { Filter } from "./Filter";
import { WaitingReviewList } from "./WaitingReviewList";

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

const Item = ({ children, className }) => (
  <li className={`hover:text-white ${className || ""}`}>
    {children}
  </li >
)

export const Home = () => {
  const auth = useAuth();
  const [checkType, setCheckType] = useState([]);
  const [bloomTaxonomy, setBloomTaxonomy] = useState([]);
  const [difficulty, setDifficulty] = useState([]);

  const allSelectedKeys = checkType
    .concat(bloomTaxonomy)
    .concat(difficulty)

  const where = (() => {
    let params = {};
    let empty = true;

    if (checkType && checkType.length > 0) {
      params.checkType = checkType;
      empty = false;
    }
    if (bloomTaxonomy && bloomTaxonomy.length > 0) {
      params.bloomTaxonomy = bloomTaxonomy;
      empty = false;
    }
    if (difficulty && difficulty.length > 0) {
      params.difficulty = difficulty;
      empty = false;
    }

    if (!empty) return { where: params };
  })();

  const [filterModalOpened, setFilterModalOpened] = useState(false);

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
        <Navigator newQuestion={true} setFilterModalOpened={setFilterModalOpened}>
          <Item
            className="ml-auto"
          >
            <div
              onClick={() => setFilterModalOpened(true)}
            >

              <FaFilter className="my-auto" />
              <span className="pl-3">Filtros</span>
            </div>
          </Item>
        </Navigator>
      }
      {filterModalOpened && (
        <Modal onClose={() => setFilterModalOpened(false)}>
          <Filter
            filterModalOpened={filterModalOpened}
            setCheckType={setCheckType}
            setBloomTaxonomy={setBloomTaxonomy}
            setDifficulty={setDifficulty}
            allSelectedKeys={allSelectedKeys}
            closeCallback={() => setFilterModalOpened(false)}
          />
        </Modal>
      )}
      <div className="bg-gray-100 w-full">
        <main className="px-8 rounded-t-xlg">
          <div className="mr-4">
            <div className="bg-gray-200 p-4 rounded my-2">
              <h2 className="text-gray-500 font-medium text-xl">Aguardando Revisão</h2>
              <hr className="border-t border-gray-400 m-px" />
              <div className="p-2">
                <WaitingReviewList isLoading={isLoadingWaitingReview} questions={questionWaitingToReview} />
              </div>
            </div>
            <QuestionsList title="Pendentes" where={{ status: 'pending', ...where }} />
            <QuestionsList title="Rascunho" where={{ status: 'draft', ...where }} editable={true} />
            <QuestionsList title="Aprovadas" where={{ status: 'approved', ...where }} />
            <QuestionsList title="Finalizadas" where={{ status: 'finished', ...where }} />
          </div>
        </main>
      </div>
    </>
  );
};
