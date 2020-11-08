import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

import { Navigator, Modal } from "../../components";
import { useAuth } from "../../utils/contexts";
import { Filter } from "./Filter";
import { QuestionPainel } from "./QuestionsPainel";

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

    if (!empty) return params;
  })();

  const [filterModalOpened, setFilterModalOpened] = useState(false);

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
            <QuestionPainel whereOptions={where} />
          </div>
        </main>
      </div>
    </>
  );
};
