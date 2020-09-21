import React from "react";
import {
  CHECK_TYPE,
  BLOOM_TAXONOMY,
  DIFFICULTY,
  STATUS,
} from "../../utils/types";
import { MdClear } from "react-icons/md";

export const Filter = ({
  setCheckType,
  setBloomTaxonomy,
  setDifficulty,
  setStatus,
}) => {
  const handleClean = () => {
    setCheckType(undefined);
    setBloomTaxonomy(undefined);
    setDifficulty(undefined);
    setStatus(undefined);
  };

  return (
    <div className="flex">
      <select
        onChange={(e) => setCheckType(e.target.value)}
        className="w-full rounded p-1 border-gray-400 border shadow-s mx-2"
      >
        <option></option>
        {CHECK_TYPE.map((item, index) => {
          return (
            <option key={index} value={item.key}>
              {item.value}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => setBloomTaxonomy(e.target.value)}
        className="w-full rounded p-1 border-gray-400 border shadow-s mx-2"
      >
        <option></option>
        {BLOOM_TAXONOMY.map((item, index) => {
          return (
            <option key={index} value={item.key}>
              {item.value}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full rounded p-1 border-gray-400 border shadow-s mx-2"
      >
        <option></option>
        {DIFFICULTY.map((item, index) => {
          return (
            <option key={index} value={item.key}>
              {item.value}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => setStatus(e.target.value)}
        className="w-full rounded p-1 border-gray-400 border shadow-s mx-2"
      >
        <option></option>
        {STATUS.map((item, index) => {
          return (
            <option key={index} value={item.key}>
              {item.value}
            </option>
          );
        })}
      </select>

      <button onClick={() => handleClean()} className="text-gray-800 hover:text-primary-dark">
        <MdClear />
      </button>
    </div>
  );
};
