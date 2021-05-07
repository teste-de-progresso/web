import React, { FC } from "react";

import { Card } from "../../../components";
import { Question } from "../../../__generated__/graphql-schema";
import { loadWIRISplugin } from "../../../utils/plugins";
import { BLOOM_TAXONOMY, DIFFICULTY } from "../../../utils/types";

type Props = {
  questionData?: Question
}

export const ViewMode: FC<Props> = ({ questionData }) => {
  if (!questionData) return null;

  const { alternatives } = questionData;

  const correctAlternative = alternatives?.find(
    (alternative) => alternative.correct === true,
  );

  const incorrectAnswers = alternatives?.filter(
    (alternative) => alternative.correct === false,
  );

  function formatDate(stringDate: string) {
    return new Date(stringDate).toLocaleDateString();
  }

  const { instruction, support, body } = questionData;

  const difficulty = DIFFICULTY.find((item) => questionData.difficulty === item.value)?.label
  const bloomTaxonomy = BLOOM_TAXONOMY.find((item) => questionData.bloomTaxonomy === item.value)?.label

  loadWIRISplugin()

  return (
    <div className="max-w-screen-lg">
      <Card className="mb-3" title="Características">
        <div className="grid grid-cols-2">
          <div>
            <span className="text-gray-700">Grau de Dificuldade: </span>
            {difficulty ?? ''}
          </div>
          <div>
            <span className="text-gray-700">Habilidade Cognitiva: </span>
            {bloomTaxonomy ?? ''}
          </div>
          <div>
            <span className="text-gray-700">Ano: </span>
            {questionData.authorshipYear}
          </div>
          <div>
            <span className="text-gray-700">Autoria: </span>
            {questionData.source === "UNIFESO" ? "Própria" : "Terceiros"}
          </div>
          <div>
            <span className="text-gray-700">Atualizada em: </span>
            {formatDate(questionData.updatedAt)}
          </div>
          <div>
            <span className="text-gray-700">Registrada em: </span>
            {formatDate(questionData.createdAt)}
          </div>
          <div>
            <span className="text-gray-700">Assunto: </span>
            {questionData.subject?.name}
          </div>
          <div>
            <span className="text-gray-700">Categoria: </span>
            {questionData.subject?.category?.name}
          </div>
          <div>
            <span className="text-gray-700">Eixo de Formação: </span>
            {questionData.subject?.axis?.name}
          </div>
        </div>
      </Card>
      {instruction && (
        <Card className="mb-3" title="Instrução">
          <div className="ck-content" dangerouslySetInnerHTML={{ __html: instruction }} />
        </Card>
      )}
      {support && (
        <Card className="mb-3" title="Suporte">
          <div className="ck-content" dangerouslySetInnerHTML={{ __html: support }} />
        </Card>
      )}
      {body && (
        <Card className="mb-3" title="Enunciado">
          <div className="ck-content" dangerouslySetInnerHTML={{ __html: body }} />
        </Card>
      )}

      <Card className="mb-3" title="Resposta Correta">
        <div className="ck-content" dangerouslySetInnerHTML={{ __html: correctAlternative?.text ?? '' }} />

        <div className="flex flex-col w-full border border-gray-300 rounded p-4 mt-4 shadow-sm">
          <div>
            <h2 className="text-xl font-medium">Explicação</h2>
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: questionData.explanation ?? '' }}
            />
          </div>
          <div className="bg-gray-400 w-full my-3" style={{ height: "1px" }} />
          <div>
            <h2 className="text-xl font-medium">Referências</h2>
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: questionData.references ?? '' }}
            />
          </div>
        </div>
      </Card>
      <Card className="mb-3" title="Distratores">
        {incorrectAnswers?.map(({ text }, index) => (
          <div key={`question-alternative-${index}`}>
            {index !== 0 && (
              <div
                className="bg-gray-400 w-full my-3"
                style={{ height: "1px" }}
              />
            )}
            <div className="ck-content" dangerouslySetInnerHTML={{ __html: text ?? '' }} />
          </div>
        ))}
      </Card>
    </div>
  );
};
