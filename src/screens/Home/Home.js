import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Dialog } from "@material-ui/core";

import { Navigator } from "../../components";
import { Filter } from "./Filter";
import { QuestionPainel } from "./QuestionsPainel";

const Item = ({ children, className }) => (
  <li className={`hover:text-white ${className || ""}`}>
    {children}
  </li>
);

export const Home = () => {
  const [checkType, setCheckType] = useState([]);
  const [bloomTaxonomy, setBloomTaxonomy] = useState([]);
  const [difficulty, setDifficulty] = useState([]);

  const allSelectedKeys = checkType
    .concat(bloomTaxonomy)
    .concat(difficulty);

  const where = (() => {
    const params = {};

    if (checkType && checkType.length > 0) {
      params.checkType = checkType;
    }
    if (bloomTaxonomy && bloomTaxonomy.length > 0) {
      params.bloomTaxonomy = bloomTaxonomy;
    }
    if (difficulty && difficulty.length > 0) {
      params.difficulty = difficulty;
    }

    return params;
  })();

  const [filterModalOpened, setFilterModalOpened] = useState(false);

  return (
    <>
      {true
        && (
          <Navigator newQuestion setFilterModalOpened={setFilterModalOpened}>
            <Item
              className="ml-auto"
            >
              <button
                onClick={() => setFilterModalOpened(true)}
                className="flex"
              >

                <FaFilter className="my-auto" />
                <span className="pl-3">Filtros</span>
              </button>
            </Item>
          </Navigator>
        )}
      <Dialog open={filterModalOpened} onClose={() => setFilterModalOpened(false)}>
        <Filter
          filterModalOpened={filterModalOpened}
          setCheckType={setCheckType}
          setBloomTaxonomy={setBloomTaxonomy}
          setDifficulty={setDifficulty}
          allSelectedKeys={allSelectedKeys}
          closeCallback={() => setFilterModalOpened(false)}
        />
      </Dialog>
      <div className="bg-gray-100 w-full">
        <main className="px-8 rounded-t-xlg">
          <div className="mr-4">
            <QuestionPainel whereOptions={where} />
          </div>
        </main>
      </div>
    </>
  );
};
