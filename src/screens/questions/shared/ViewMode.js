import React from "react";

import { Card } from "../../../components";
import { loadWIRISplugin } from "../../../utils";

const bloomTaxonomy = {
  remember: "Recordar",
  understand: "Compreender",
  apply: "Aplicar",
  analyze: "Analisar",
  evaluate: "Avaliar",
  create: "Criar",
};

const difficulty = {
  easy: "Fácil",
  medium: "Moderada",
  hard: "Difícil",
};

export const ViewMode = ({ questionData = {} }) => {
  if (!questionData) return null;

  const { alternatives } = questionData;

  const { text: correctAlternativeText } = alternatives.find(
    (alternative) => alternative.correct === true,
  );

  const incorrectAnswers = alternatives.filter(
    (alternative) => alternative.correct === false,
  );

  function formatDate(stringDate) {
    return new Date(stringDate).toLocaleDateString();
  }

  const { instruction, support, body } = questionData;

  loadWIRISplugin();

  return (
    <div className="max-w-screen-lg">
      <Card className="mb-3" title="Detalhes da questão">
        <div className="grid grid-cols-2">
          <div>
            <span className="text-gray-700">Dificuldade: </span>
            {difficulty[questionData.difficulty]}
          </div>
          <div>
            <span className="text-gray-700">Taxonomia de Bloom: </span>
            {bloomTaxonomy[questionData.bloomTaxonomy]}
          </div>
          <div>
            <span className="text-gray-700">Ano de autoria: </span>
            {questionData.authorshipYear}
          </div>
          <div>
            <span className="text-gray-700">Autoria: </span>
            {questionData.source === "UNIFESO" ? "Própria" : "Terceiros"}
          </div>
          <div>
            <span className="text-gray-700">Atualizado em: </span>
            {formatDate(questionData.updatedAt)}
          </div>
          <div>
            <span className="text-gray-700">Registrada em: </span>
            {formatDate(questionData.createdAt)}
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
        <div className="ck-content" dangerouslySetInnerHTML={{ __html: correctAlternativeText }} />

        <div className="flex flex-col w-full border border-gray-300 rounded p-4 mt-4 shadow-sm">
          <div>
            <h2 className="text-xl font-medium">Explicação</h2>
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: questionData.explanation }}
            />
          </div>
          <div className="bg-gray-400 w-full my-3" style={{ height: "1px" }} />
          <div>
            <h2 className="text-xl font-medium">Referências</h2>
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: questionData.references }}
            />
          </div>
        </div>
      </Card>
      <Card className="mb-3" title="Distratores">
        {incorrectAnswers.map(({ text }, index) => (
          <div key={`question-alternative-${index}`}>
            {index !== 0 && (
              <div
                className="bg-gray-400 w-full my-3"
                style={{ height: "1px" }}
              />
            )}
            <div className="ck-content" dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        ))}
      </Card>
    </div>
  );
};
