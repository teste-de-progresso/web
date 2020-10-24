import React from "react";
import { gql, useQuery } from "@apollo/client";

import { Card } from "../../../../components";

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

export const ReadQuestion = ({ id }) => {
  const GET_QUESTION = gql`
  query {
    objectiveQuestion(id: ${id}) {
      id
      instruction
      support
      body
      own
      authorshipYear
      difficulty
      explanation
      source
      bloomTaxonomy
      references
      checkType
      status
      createdAt
      updatedAt
      reviewer {
        id
        name
      }
      subject {
        id
        name
      }
      alternatives {
        correct
        text
      }
    }
  }
`;

  const { loading, data } = useQuery(GET_QUESTION);
  const questionData = data?.objectiveQuestion;

  if (loading || !questionData) return null;

  const alternatives = questionData.alternatives;

  const correctAlternative = alternatives.find(
    (alternative) => alternative.correct === true
  );

  const incorrectAnswers = alternatives.filter(
    (alternative) => alternative.correct === false
  );

  function formatDate(stringDate) {
    return new Date(stringDate).toLocaleDateString();
  }

  const { instruction, support, body } = questionData;

  return (
    <div className="m-auto max-w-screen-md">
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
            {questionData.own ? "Própria" : "Terceiros"}
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
          <div
            dangerouslySetInnerHTML={{
              __html: instruction || "",
            }}
          />
        </Card>
      )}
      {support && (
        <Card className="mb-3" title="Suporte">
          <div dangerouslySetInnerHTML={{ __html: support || "" }} />
        </Card>
      )}
      {body && (
        <Card className="mb-3" title="Enunciado">
          <div dangerouslySetInnerHTML={{ __html: body || "" }} />
        </Card>
      )}

      <Card className="mb-3" title="Resposta Correta">
        <div
          dangerouslySetInnerHTML={{
            __html: correctAlternative?.text || "",
          }}
        />
        <div className="flex flex-col w-full border border-gray-300 rounded p-4 mt-4 shadow-sm">
          <div>
            <h2 className="text-xl font-medium">Explicação</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: questionData.explanation || "",
              }}
            />
          </div>
          <div
            className="bg-gray-400 w-full my-3"
            style={{ height: "1px" }}
          ></div>
          <div>
            <h2 className="text-xl font-medium">Referências</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: questionData.references || "",
              }}
            />
          </div>
        </div>
      </Card>
      <Card className="mb-3" title="Distratores">
        {incorrectAnswers.map((item, index) => {
          return (
            <div key={index}>
              {index !== 0 && (
                <div
                  className="bg-gray-400 w-full my-3"
                  style={{ height: "1px" }}
                ></div>
              )}
              <div dangerouslySetInnerHTML={{ __html: item?.text || "" }} />
            </div>
          );
        })}
      </Card>
    </div>
  );
};
