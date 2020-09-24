import React, { useContext, useState } from "react";
import { Card, Input } from "../../../widgets";
import { FormContext } from "../../../layout/SteppedForm";
import { SubjectSelect } from "./";

import { BLOOM_TAXONOMY, CHECK_TYPE, DIFFICULTY } from "../../../utils/types";

export const FeaturesForm = ({
  own,
  source,
  authorshipYear,
  difficulty,
  bloomTaxonomy,
  checkType,
  subject,
}) => {
  const formContext = useContext(FormContext);
  const currentYear = new Date().getFullYear();
  const [ownQuestion, setOwnQuestion] = useState(!own);

  const handleOwnCheck = (value) => {
    setOwnQuestion(value);
    formContext.setValue("source", value ? "UNIFESO" : "");
  };

  return (
    <Card title={"Características"}>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2">
          <div className="w-full">
            <h2>Tipo</h2>
            <select
              ref={formContext.register}
              className="w-full rounded p-1 border-gray-400 border shadow-sm"
              name={"checkType"}
              defaultValue={checkType}
            >
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
            <h2>Ano</h2>
            <Input
              ref={formContext.register}
              type="number"
              min="1999"
              max={currentYear}
              step="1"
              name="authorshipYear"
              defaultValue={authorshipYear}
            />
          </div>
        </div>
        <div className={"border bg-white border-gray-300 rounded shadow-sm"}>
          <div className="p-4">
            <h2 className="mb-2">Origem</h2>
            <div className="flex flex-row space-x-2">
              <div className="pl-3 w-full my-auto">
                <input
                  type="checkbox"
                  id="own"
                  name="own"
                  checked={ownQuestion}
                  ref={formContext.register}
                  onChange={(e) => handleOwnCheck(e.target.checked)}
                />
                <label htmlFor="own"> Autoria própria</label>
              </div>
              <div className="w-full">
                <Input
                  ref={formContext.register}
                  className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                  name={"source"}
                  defaultValue={source || (ownQuestion ? "UNIFESO" : "")}
                  disabled={ownQuestion}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"flex space-x-2"}>
          <div className="w-full">
            <h2>Taxonomia de Bloom</h2>
            <select
              ref={formContext.register}
              className="w-full rounded p-1 border-gray-400 border shadow-sm"
              name={"bloomTaxonomy"}
              defaultValue={bloomTaxonomy}
            >
              {BLOOM_TAXONOMY.map((item, index) => {
                return (
                  <option key={index} value={item.key}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <h2>Dificuldade</h2>
            <select
              ref={formContext.register}
              className="w-full rounded p-1 border-gray-400 border shadow-sm"
              name={"difficulty"}
              defaultValue={difficulty}
            >
              {DIFFICULTY.map((item, index) => {
                return (
                  <option key={index} value={item.key}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={"flex space-x-2"}>
          <div className="w-full">
            <h2>Assunto</h2>
            <SubjectSelect defaultValue={subject} />
          </div>
        </div>
      </div>
    </Card>
  );
};
