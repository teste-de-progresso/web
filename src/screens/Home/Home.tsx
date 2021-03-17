import React, { FC, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Dialog } from "@material-ui/core";

import { Navigator } from "../../components";
import { QuestionsFilter } from "./QuestionsFilter";
import { QuestionsPainel } from "./QuestionsPainel";
import { BloomTaxonomy, Check, Difficulty, QuestionWhereInput } from "../../graphql/__generated__/graphql-schema";

export const Home: FC = () => {
  const [checkType, setCheckType] = useState<Check[] | undefined>();
  const [bloomTaxonomy, setBloomTaxonomy] = useState<BloomTaxonomy[] | undefined>();
  const [difficulty, setDifficulty] = useState<Difficulty[] | undefined>();
  const [filterModalHidden, setFilterModalHidden] = useState(true);

  const where: QuestionWhereInput = {
    checkType,
    bloomTaxonomy,
    difficulty,
  };

  return (
    <>
      <Navigator newQuestion={true}>
        <li className={"hover:text-white ml-auto"}>
          <button onClick={() => setFilterModalHidden(false)} className="flex">
            <FaFilter className="my-auto" />
            <span className="pl-3">Filtros</span>
          </button>
        </li>
      </Navigator>
      <Dialog
        hidden={filterModalHidden}
        open={true}
        onClose={() => setFilterModalHidden(true)}
      >
        <QuestionsFilter
          setCheckType={setCheckType}
          setBloomTaxonomy={setBloomTaxonomy}
          setDifficulty={setDifficulty}
          hiddenModal={() => setFilterModalHidden(true)}
        />
      </Dialog>
      <div className="bg-gray-100 w-full">
        <main className="sm:px-8 rounded-t-xlg">
          <div className="mx-2 sm:mx-0 sm:mr-4">
            <QuestionsPainel where={where} />
          </div>
        </main>
      </div>
    </>
  );
};
