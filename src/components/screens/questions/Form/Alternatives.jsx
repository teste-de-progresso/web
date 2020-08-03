import React from "react";

export const Alternatives = ({ register }) => {
  const identifiers = ["A", "B", "C", "D", "E"];
  return (
    <>
      {identifiers.map((identifier) => {
        return <Option identifer={identifier} register={register} />;
      })}
    </>
  );
};

const Option = ({ identifer, text, explanation, register }) => {
  return (
    <div className="m-1 bg-white md:rounded md:flex shadow-lg border border-gray-200 w-full h-full">
      <div className="p-2">{identifer})</div>

      <div className="p-1">
        <div>
          <input
            name={`${identifer}-text`}
            ref={register}
            value={text}
            className="m-2 block bg-gray-200 rounded p-1 w-full border-gray-300 border shadow-sm"
          />
        </div>
        <div>
          <input
            name={`${identifer}-explanation`}
            ref={register}
            value={explanation}
            className="m-2 block bg-gray-200 rounded p-1 w-full border-gray-300 border shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
