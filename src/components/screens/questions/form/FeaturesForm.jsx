import React, { useContext, useState } from "react";
import { Card } from "../../../widgets/Card";
import { Input } from "../../../widgets/Input";
import { FormContext } from "../../../layout/SteppedForm";

export const FeaturesForm = ({
  own,
  source,
  authorshipYear,
  difficulty,
  bloomTaxonomy,
  checkType,
}) => {
  const formContext = useContext(FormContext);
  const currentYear = new Date().getFullYear();
  const [ownQuestion, setOwnQuestion] = useState(own);

  return (
    <Card title={"Características"}>
      <div className="flex flex-col space-y-4">
        <div className={"flex space-x-2"}>
          <div className="w-full">
            <h2>Tipo</h2>
            <select
              ref={formContext.register}
              className="w-full rounded p-1 w-full border-gray-400 border shadow-sm"
              name={"checkType"}
              defaultValue={checkType}
            >
              <option value="incomplete_affirmation">
                Afirmação Incompleta
              </option>
              <option value="assertion_reason">Asserção-Razão</option>
              <option value="column_association">Associação de Colunas</option>
              <option value="gap_or_replacement_of_terms">
                Lacuna ou Substituição de Termos
              </option>
              <option value="multiple_choice_complex">
                Múltipla Escolha Complexa
              </option>
              <option value="sultiple_multiple_choice">
                Múltipla Escolha Simples
              </option>
              <option value="serialization">Seriação</option>
              <option value="true_or_false">Verdadeiro (V) ou Falso (F)</option>
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
              name={"ano"}
              defaultValue={authorshipYear}
            />
          </div>
        </div>
        <div className={"border bg-white border-gray-300 rounded shadow-sm"}>
          <div className="p-4 flex space-x-2">
            <div className="w-full">
              <h2>Autoria</h2>
              <select
                ref={formContext.register}
                className="w-full rounded p-1 w-full border-gray-400 border shadow-sm"
                name={"autoria"}
                defaultValue={own}
                onChange={(e) => setOwnQuestion(e.target.value === "true")}
              >
                <option value={true}>Própria</option>
                <option value={false}>Terceiros</option>
              </select>
            </div>
            <div className="w-full">
              <h2>Origem</h2>
              <Input
                ref={formContext.register}
                className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                name={"source"}
                defaultValue={source}
                disabled={ownQuestion}
              />
            </div>
          </div>
        </div>
        <div className={"flex space-x-2"}>
          <div className="w-full">
            <h2>Taxonomia de Bloom</h2>
            <select
              ref={formContext.register}
              className="w-full rounded p-1 w-full border-gray-400 border shadow-sm"
              name={"bloomTaxonomy"}
              defaultValue={bloomTaxonomy}
            >
              <option value="remember">Relembrar</option>
              <option value="understand">Entender</option>
              <option value="apply">Aplicar</option>
              <option value="analyze">Analizar</option>
              <option value="evaluate">Avaliar</option>
              <option value="create">Criar</option>
            </select>
          </div>
          <div className="w-full">
            <h2>Dificuldade</h2>
            <select
              ref={formContext.register}
              className="w-full rounded p-1 w-full border-gray-400 border shadow-sm"
              name={"difficulty"}
              defaultValue={difficulty}
            >
              <option value="easy">Fácil</option>
              <option value="medium">Moderada</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
};
