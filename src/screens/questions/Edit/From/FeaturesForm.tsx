import React, { FC, useContext, useState } from "react";
import { Card, FormContext } from "../../../../components";
import { SubjectSelect } from "./SubjectSelect";
import { ReviewerSelect } from "./ReviewerSelect";

import { BLOOM_TAXONOMY, CHECK_TYPE, DIFFICULTY } from "../../../../utils/types";
import { Question, Subject, User } from "../../../../graphql/__generated__/graphql-schema";

type Props = {
  question?: Question
}

export const FeaturesForm: FC<Props> = ({ question }) => {
  const formContext = useContext(FormContext);
  const currentYear = new Date().getFullYear();

  const {
    source,
    authorshipYear,
    difficulty,
    bloomTaxonomy,
    checkType,
    subject,
    reviewer } = question || {} as Question

  const [ownQuestion, setOwnQuestion] = useState(source === "UNIFESO" || source === undefined);

  const handleOwnCheck = (value: any) => {
    setOwnQuestion(value);

    if (value) {
      formContext.setValue("source", "UNIFESO");
      formContext.setValue(
        "authorshipYear",
        value ? String(new Date().getFullYear()) : "",
      );
    } else {
      formContext.setValue("source", "");
      formContext.setValue("authorshipYear", "");
    }
  };

  return (
    <>
      <Card title="Características">
        <div className="flex justify-between">
          <div className="flex">
            <label htmlFor="own" className="mr-3 my-auto">
              Autoria
            </label>
            <div className="my-auto">
              <input
                className="my-auto"
                type="radio"
                id="own"
                checked={ownQuestion}
                ref={formContext.register}
                onChange={() => handleOwnCheck(true)}
              />
              <label htmlFor="own" className="ml-1">Própria</label>
            </div>
            <div className="my-auto ml-3">
              <input
                className="my-auto"
                type="radio"
                id="third"
                name="own"
                value={"false"}
                checked={!ownQuestion}
                ref={formContext.register}
                onChange={() => handleOwnCheck(false)}
              />
              <label htmlFor="third" className="ml-1">Outro</label>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <h2 className="pr-2 pl-3 my-auto">Fonte</h2>
              <div className="w-full">
                <div style={{ maxWidth: "194px" }}>
                  <input
                    className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                    ref={formContext.register}
                    name="source"
                    defaultValue={source || (ownQuestion ? "UNIFESO" : "")}
                    readOnly={ownQuestion}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <h2 className="pr-2 pl-3 my-auto">Ano</h2>
              <div style={{ maxWidth: "62px" }}>
                <input
                  className="w-full rounded p-1 border-gray-400 border shadow-sm"
                  ref={formContext.register}
                  type="number"
                  min="1999"
                  max={currentYear}
                  step="1"
                  name="authorshipYear"
                  defaultValue={authorshipYear ?? ""}
                  readOnly={ownQuestion}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 col-gap-2 mt-3">
          <div className="w-full grid grid-cols-1 row-gap-4">
            <div className="flex flex-col">
              <h2>Grau de Dificuldade</h2>
              <select
                ref={formContext.register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name="difficulty"
                defaultValue={difficulty ?? ""}
              >
                <option />
                {DIFFICULTY.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <h2>Tipo</h2>
              <select
                ref={formContext.register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name="checkType"
                defaultValue={checkType ?? ""}
              >
                <option />
                {CHECK_TYPE.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <h2>Habilidade (Taxonomia de Bloom)</h2>
              <select
                ref={formContext.register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name="bloomTaxonomy"
                defaultValue={bloomTaxonomy ?? ""}
              >
                <option />
                {BLOOM_TAXONOMY.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <SubjectSelect subject={subject || { id: "" } as Subject} />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h2>Revisor</h2>
          <ReviewerSelect reviewer={reviewer || { id: "", name: "" } as User} />
        </div>
      </Card>
    </>
  );
};
