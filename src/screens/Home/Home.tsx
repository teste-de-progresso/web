import React, { FC, useState } from "react";
import { FaFilter } from "react-icons/fa";

import { Navigator } from "../../components";
import { QuestionsFilter } from "./QuestionsFilter";
import { QuestionsPainel } from "./QuestionsPainel";
import { FiltersProvider } from './QuestionsFilterProvider'

export const Home: FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <FiltersProvider>
      <Navigator newQuestion={true}>
        <li className={"hover:text-white ml-auto"}>
          <button onClick={() => setFilterOpen(true)} className="flex">
            <FaFilter className="my-auto" />
            <span className="pl-3">Filtros</span>
          </button>
        </li>
      </Navigator>
      <QuestionsFilter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      />
      <div className="bg-gray-100 w-full">
        <main className="sm:px-8 rounded-t-xlg">
          <div className="mx-2 sm:mx-0 sm:mr-4">
            <QuestionsPainel />
          </div>
        </main>
      </div>
    </FiltersProvider>
  );
};
