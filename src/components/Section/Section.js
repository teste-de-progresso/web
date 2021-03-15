import React from "react";
import {
  FaChevronDown, FaChevronUp, FaArrowLeft, FaArrowRight,
} from "react-icons/fa";

const SwitchPageButton = ({ page, changePage, onlyOnePage }) => (
  (page && !onlyOnePage)
    ? (
      <div className="text-sm sm:text-base text-gray-700 flex flex-row-reverse">
        <div className="p-1">
          <button
            onClick={() => changePage("previous")}
            className="p-2"
          >
            <FaArrowLeft />
          </button>
          <span className="mb-2 m-auto">
            Página:
            {" "}
            {page}
          </span>
          <button
            onClick={() => changePage("next")}
            className="p-2"
          >
            <FaArrowRight />
          </button>
          <input readOnly hidden value={page} />
        </div>
      </div>
    ) : null
);

export const Section = ({
  children, title, cardOpened, handleOpenCard, page, changePage, onlyOnePage,
}) => {
  if (window.screen.width < 640) {
    return (
      <>
        <div className="bg-gray-200 rounded mt-4 w-full">
          <div className=" inline-flex items-center justify-between w-full p-2">
            <h2 className="text-gray-500 pt-2 text-sm">{title}</h2>
            <button onClick={handleOpenCard} className="text-gray-700">
              {cardOpened ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div>
            {cardOpened && (
              <>
                <hr className="border-t border-gray-400 mb-4 mx-2" />
                <div className="py-1 text-sm overflow-y-scroll">
                  {children}
                </div>
                <SwitchPageButton page={page} changePage={changePage} onlyOnePage={onlyOnePage} />
              </>
            )}

          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-200 p-4 rounded my-2">
      <h2 className="text-gray-500 font-medium text-xl">{title}</h2>
      <hr className="border-t border-gray-400 m-px" />
      <div className="p-2">
        {children}
      </div>
    </div>
  );
};
