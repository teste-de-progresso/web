import React, { useContext, useState } from "react";

import { Card, Input, FormContext } from "../../../../components";
import SubjectSelect from "./SubjectSelect";
import ReviewerSelect from "./ReviewerSelect";

import {
  BLOOM_TAXONOMY,
  CHECK_TYPE,
  DIFFICULTY,
} from "../../../../utils/types";

export const FeaturesForm = ({ questionData }) => {
  const {
    own,
    source,
    authorshipYear,
    difficulty,
    bloomTaxonomy,
    checkType,
    subject,
    reviewer,
  } = questionData;

  const formContext = useContext(FormContext);
  const currentYear = new Date().getFullYear();
  const [ownQuestion, setOwnQuestion] = useState(own);

  const handleOwnCheck = (value) => {
    setOwnQuestion(value);

    if (value) {
      formContext.setValue("source", "UNIFESO");
      formContext.setValue(
        "authorshipYear",
        value ? String(new Date().getFullYear()) : ""
      );
    } else {
      formContext.setValue("source", "");
    }
  };

  return (
    <>
      <Card title="Características">
        <div className="flex justify-between">
          <div className="flex">
            <label htmlFor="own" className="mr-2 my-auto">
              Autoria:
            </label>
            <div className="my-auto">
              <input
                className="my-auto"
                type="radio"
                id="own"
                name="own"
                value={true}
                checked={ownQuestion}
                ref={formContext.register}
                onChange={() => handleOwnCheck(true)}
              />
              <label htmlFor="own">Própria</label>
            </div>
            <div className="my-auto ml-2">
              <input
                className="my-auto"
                type="radio"
                id="third"
                name="own"
                value={false}
                checked={!ownQuestion}
                ref={formContext.register}
                onChange={() => handleOwnCheck(false)}
              />
              <label htmlFor="third">Terceiro(s)</label>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <h2 className="pr-2 pl-3 my-auto">Fonte:</h2>
              <div className="w-full">
                <div style={{ maxWidth: "194px" }}>
                  <Input
                    ref={formContext.register}
                    className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                    name={"source"}
                    defaultValue={source || (ownQuestion ? "UNIFESO" : "")}
                    readOnly={ownQuestion}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <h2 className="pr-2 pl-3 my-auto">Ano:</h2>
              <div style={{ maxWidth: "62px" }}>
                <Input
                  ref={formContext.register}
                  type="number"
                  min="1999"
                  max={currentYear}
                  step="1"
                  name="authorshipYear"
                  defaultValue={authorshipYear || "2020"}
                  readOnly={ownQuestion}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 col-gap-2 mt-3">
          <div className="w-full grid grid-cols-1 row-gap-4">
            <div className="flex flex-col">
              <h2>Grau de Dificuldade:</h2>
              <select
                ref={formContext.register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name={"difficulty"}
                defaultValue={difficulty}
              >
                <option value=""></option>
                {DIFFICULTY.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <h2>Tipo:</h2>
              <select
                ref={formContext.register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name={"checkType"}
                defaultValue={checkType}
              >
                <option value=""></option>
                {CHECK_TYPE.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full">
              <h2>Habilidade (Taxonomia de Bloom):</h2>
              <select
                ref={formContext.register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name={"bloomTaxonomy"}
                defaultValue={bloomTaxonomy}
              >
                <option value=""></option>
                {BLOOM_TAXONOMY.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="w-full">
            <SubjectSelect subjectId={subject.id} />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h2>Revisor:</h2>
          <ReviewerSelect reviewerId={reviewer.id} />
        </div>
      </Card>
    </>
  );
};
