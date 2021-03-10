import React from "react";

import { WaitingReviewList } from "./WaitingReviewList";
import { QuestionsGroup } from "./QuestionsGroup";

export const QuestionPainel = ({ whereOptions }) => {
  const questionsGroups = [
    { title: "Aguardando parecer do revisor", where: { status: "pending", ...whereOptions } },
    { title: "Rascunhos", where: { status: "draft", ...whereOptions }, editable: true },
    { title: "Aprovadas", where: { status: "approved", ...whereOptions } },
    { title: "Regristradas", where: { status: "finished", ...whereOptions } },
  ];

  const questionsGroupsComponents = questionsGroups.map(({ title, where, editable }, index) => <QuestionsGroup key={index} title={title} where={where} editable={editable} />);

  return (
    <>
      <WaitingReviewList />
      {questionsGroupsComponents}
    </>
  );
};
