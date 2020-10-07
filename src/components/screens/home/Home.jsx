import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { Button, Modal } from "../../widgets";
import { QuestionsList, Filter } from "./";
import { useAuth } from "../../../context/Authentication";

const RESULT_LIMIT = [5, 10, 15, 20, 30, 40, 50];

export const Home = () => {
  const auth = useAuth();
  const [checkType, setCheckType] = useState([]);
  const [bloomTaxonomy, setBloomTaxonomy] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [status, setStatus] = useState([]);

  const allSelectedKeys = checkType
    .concat(bloomTaxonomy)
    .concat(difficulty)
    .concat(status);

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
    if (status && status.length > 0) {
      params.status = status;
      empty = false;
    }

    if (!empty) return { where: params };
  })();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [filterModalOpened, setFilterModalOpened] = useState(false);

  const changePage = (direction) => {
    if (!isLastPage && direction === "next") setPage(page + 1);
    if (!isFirstPage && direction === "previous") setPage(page - 1);
  };

  const handleLimit = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const isTeacher = (() => {
    if (auth.user.roles && auth.user.roles.length >= 1) {
      return auth.user.roles.includes("teacher");
    }
    return false;
  })();

  const history = useHistory();

  const handleNewQuestion = () => {
    if (!isTeacher) return;

    history.push("/question/new");
  };

  const authenticationState = useSelector((state) => state.auth);
  const userId = (() => {
    if (isTeacher) return authenticationState.user.user_id;
  })();

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <div className="flex justify-between">
          <div className="my-auto flex flex-row">
            <button
              className="flex appearance-none bg-gray-300 p-1 border border-gray-200 rounded ml-2"
              onClick={() => setFilterModalOpened(true)}
            >
              Filtros
              <FaFilter className="m-auto" />
            </button>
          </div>
          <div className="flex">
            {isTeacher && (
              <div className="lg:max-w-xs ml-3 my-auto flex justify-center">
                <Button onClick={handleNewQuestion} className="w-full">
                  Registrar questão
                </Button>
              </div>
            )}
          </div>
        </div>
        <QuestionsList
          page={page}
          limit={limit}
          userId={userId}
          where={where}
          setIsFirstPage={setIsFirstPage}
          setIsLastPage={setIsLastPage}
        />
        <div className="my-auto flex mt-5">
          <div className="bg-gray-200">
            <button
              onClick={() => changePage("previous")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l p-2  "
            >
              <MdNavigateBefore />
            </button>
            <span className="p-2 m-auto">Pagina: {page}</span>
            <button
              onClick={() => changePage("next")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r p-2"
            >
              <MdNavigateNext />
            </button>
            <input readOnly hidden value={page} />
          </div>

          <div className="my-auto ml-2">
            <select
              defaultValue={limit}
              onChange={(e) => handleLimit(Number(e.target.value))}
              className="block appearance-none w-full bg-gray-300 p-1 border border-gray-200 rounded"
            >
              {RESULT_LIMIT.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    Até {item} items
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </main>
      {filterModalOpened && (
        <Modal onClose={() => setFilterModalOpened(false)}>
          <Filter
            setCheckType={setCheckType}
            setBloomTaxonomy={setBloomTaxonomy}
            setDifficulty={setDifficulty}
            setStatus={setStatus}
            allSelectedKeys={allSelectedKeys}
            closeCallback={() => setFilterModalOpened(false)}
          />
        </Modal>
      )}
    </div>
  );
};
