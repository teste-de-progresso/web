import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import { Button } from "../widgets";

export const FormContext = React.createContext({
  register: undefined,
  control: undefined,
});

const SAVE_QUESTION = gql`
  mutation($input: saveObjectiveInput!) {
    saveObjective(input: $input) {
      payload {
        id
        introduction
        body
        explanation
        authorshipYear
        own
        status
        bloomTaxonomy
        difficulty
        alternatives {
          correct
          text
        }
      }
    }
  }
`;

export const SteppedForm = ({ children, questionId }) => {
  const allSteps = children.map((x) => x.props["step"]);
  const minStep = Math.min(...allSteps);
  const maxStep = Math.max(...allSteps);
  const [currentStep, setCurrentStep] = useState(minStep);
  const [submitNext, setSubmitNext] = useState(false);

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, maxStep));
    setSubmitNext(currentStep === maxStep);
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, minStep));
    setSubmitNext(false);
  };

  const { register, handleSubmit, control } = useForm();

  const [saveQuestion] = useMutation(SAVE_QUESTION);

  const history = useHistory();

  const onSubmit = async (inputs) => {
    const objectiveQuestion = {
      body: inputs.enunciado,
      own: inputs.autoria === "true",
      explanation: inputs.correctAlternativeExplanation,
      references: inputs.correctAlternativeExplanationReference,
      bloomTaxonomy: inputs.bloomTaxonomy,
      difficulty: inputs.difficulty,
      source: inputs.source,
      checkType: inputs.checkType,
      authorshipYear: String(inputs.ano),
      alternatives: [
        {
          correct: true,
          text: inputs.correctAlternative || "",
        },
        {
          correct: false,
          text: inputs.incorrectAlternative1 || "",
        },
        {
          correct: false,
          text: inputs.incorrectAlternative2 || "",
        },
        {
          correct: false,
          text: inputs.incorrectAlternative3 || "",
        },
        {
          correct: false,
          text: inputs.incorrectAlternative4 || "",
        },
      ],
    };

    if (questionId) {
      objectiveQuestion.id = questionId;
    }

    await saveQuestion({
      variables: {
        input: {
          objectiveQuestion: objectiveQuestion,
        },
      },
    });

    history.push("/");
  };

  return (
    <div className="m-auto max-w-screen-md">
      <form
        className="h-full flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormContext.Provider value={{ register, control }}>
          {children.map((x) => {
            const visible = x.props["step"] === currentStep;

            return (
              <div key={x.props["step"]} className={visible ? "" : "hidden"}>
                {x}
              </div>
            );
          })}
        </FormContext.Provider>

        <div className="flex justify-end space-x-2">
          <Button
            className={minStep === currentStep ? "hidden" : ""}
            onClick={() => handleBack()}
          >
            Retornar
          </Button>
          <Button
            type={submitNext ? "submit" : "button"}
            onClick={() => handleNext()}
          >
            {maxStep === currentStep ? "Finalizar" : "Prosseguir"}
          </Button>
        </div>
      </form>
    </div>
  );
};
