import React from "react";

import { WaitingReviewList } from "./WaitingReviewList"
import { QuestionsGroup } from "./QuestionsGroup";

export const QuestionPainel = ({ whereOptions }) => {
  const questionsGroups = [
    { title: "Pendentes", where: { status: 'pending', ...whereOptions } },
    { title: "Rascunho", where: { status: 'draft', ...whereOptions }, editable: true },
    { title: "Aprovadas", where: { status: 'approved', ...whereOptions } },
    { title: "Finalizadas", where: { status: 'finished', ...whereOptions } },
  ]

  return (
    <>
      <WaitingReviewList />
      {questionsGroups.map(({ title, where, editable }) => {
        return <QuestionsGroup title={title} where={where} editable={editable} />
      })}
    </>
  )
}