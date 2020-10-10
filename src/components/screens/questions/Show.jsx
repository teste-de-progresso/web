import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { Card, CardGrid, Navigator } from "../../widgets";

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

export const Show = () => {
  const { id } = useParams();
  const history = useHistory();

  if (!id) history.push("/");

  const GET_QUESTION = gql`
    query {
      objectiveQuestion(id: ${id}) {
        id
        own
        authorshipYear
        instruction
        body
        support
        difficulty
        explanation
        source
        bloomTaxonomy
        updatedAt
        createdAt
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

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <Navigator />
        <div className="m-auto max-w-screen-md">
          <Card className="mb-3" title="Detalhes da questão">
            <CardGrid>
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
            </CardGrid>
          </Card>

          <Card className="mb-3" title="Instrução">
            <div
              dangerouslySetInnerHTML={{ __html: questionData.instruction || "" }}
            />
          </Card>
          <Card className="mb-3" title="Suporte">
            <div
              dangerouslySetInnerHTML={{ __html: questionData.support || "" }}
            />
          </Card>
          <Card className="mb-3" title="Enunciado">
            <div
              dangerouslySetInnerHTML={{ __html: questionData.body || "" }}
            />
          </Card>

          <Card className="mb-3" title="Alternativa correta">
            <div
              dangerouslySetInnerHTML={{
                __html: correctAlternative?.text || "",
              }}
            />
          </Card>
          <Card className="mb-3" title="Explicação da alternativa correta">
            <div
              dangerouslySetInnerHTML={{
                __html: questionData?.explanation || "",
              }}
            />
          </Card>
          <Card className="mb-3" title="Distratores">
            {incorrectAnswers.map(item => {
              return (
                <div dangerouslySetInnerHTML={{ __html: item?.text || "", }} />
              )
            })}
          </Card>
        </div>
      </main>
    </div>
  );
};
