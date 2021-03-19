import React, { FC, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Question } from '../../graphql/__generated__/graphql-schema'
import { useAuth } from '../../utils/contexts';

const EditIcon = styled(MdModeEdit)`
  margin: auto;
  font-size: 1.5rem;
`;

type Props = {
  questions: Question[]
  title: string
  pagination?: {
    onNextPageClick: () => void
    hasNextPage: boolean
    hasPreviousPage: boolean
    onPreviousPageClick: () => void
  }
}

export const QuestionsList: FC<Props> = ({ questions, title, pagination }) => {
  const { user } = useAuth()
  const history = useHistory()
  const [pageCount, setPageCount] = useState(1)

  const formatDate = (stringDate: string) => new Date(stringDate).toLocaleDateString()

  const handleEditQuestion = (id: string) => history.push(`/question/${id}/edit`)
  const handleReviewQuestion = (id: string) => history.push(`/question/${id}/review`)
  const handleShowQuestion = (id: string) => history.push(`/question/${id}`)

  const handleOnNextPageClick = () => {
    if (pagination?.hasNextPage) {
      pagination.onNextPageClick()
      setPageCount(pageCount + 1)
    }
  }
  const handleOnPreviousPageClick = () => {
    if (pagination?.hasPreviousPage) {
      pagination.onPreviousPageClick()
      setPageCount(pageCount - 1)
    }
  }

  return (
    <div className="bg-gray-200 p-4 rounded my-2">
      <div className="flex">
        <h2 className="text-gray-500 font-medium text-xl">{title}</h2>
        <div className="ml-auto text-sm sm:text-base text-gray-700">
          <button
            className="p-2"
            onClick={handleOnPreviousPageClick}
            style={{ visibility: (pagination?.hasPreviousPage ? 'visible' : 'hidden') }}
          >
            <FaArrowLeft />
          </button>
          Página: {pageCount}
          <button
            className="p-2"
            onClick={handleOnNextPageClick}
            style={{ visibility: (pagination?.hasNextPage ? 'visible' : 'hidden') }}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-400 m-px" />
      <div className="p-2 text-sm">
        {questions.length
          ? <div className="flex-col w-full sm:grid sm:gap-4 sm:col-gap-8 sm:grid-cols-4">
            {questions.map((question) => (
              <div
                key={`question-${question.uuid}`}
                className="mx-1 sm:mx-0 mb-4 sm:mb-0 border-l-8 border-primary-light flex bg-white hover:bg-unifeso-50 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
              >
                <div
                  className="flex flex-col w-full px-3 py-2"
                  onClick={() => {
                    if (question.user.id === user?.user_id.toString()) {
                      handleShowQuestion(question.uuid)
                    }
                    else {
                      handleReviewQuestion(question.uuid)
                    }
                  }}
                >
                  <h2>
                    {`# ${question.id}`}
                  </h2>
                  <div className="text-sm text-gray-700 flex flex-col flex-wrap justify-between">
                    <span>
                      Registrado em:
                    {" "}
                      {formatDate(question.createdAt)}
                    </span>
                    <span>
                      Atualizado em:
                    {" "}
                      {formatDate(question.updatedAt)}
                    </span>
                  </div>
                </div>
                {(question.user.id === user?.user_id.toString() && question.status !== 'finished') &&
                  <div
                    className="flex flex-col relative flex-grow justify-center"
                  >
                    <div
                      className="group-hover:block absolute bg-gray-300 hover:bg-primary-normal text-gray-500 hover:text-gray-100 hover:shadow-lg rounded-full p-2 cursor-pointer shadow-inner transition-all duration-500"
                      style={{ left: '-1.5rem' }}
                      onClick={() => handleEditQuestion(question.uuid)}
                    >
                      <EditIcon />
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
          : <div className="grid text-gray-800" style={{ placeItems: 'center' }}>
            <div className="text-center">
              <span className="text-sm sm:text-base">
                Nenhuma questão registrada.
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}