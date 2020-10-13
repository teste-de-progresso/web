import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";

import { formatInput } from "../screens/questions";
import { Button, Navigator, Modal, Alert } from "../widgets";
import { validateQuestionInputs } from "../utils/validateQuestionInputs";

export const FormContext = React.createContext({
  register: undefined,
  control: undefined,
  setValue: undefined,
});

const SAVE_QUESTION = gql`
  mutation($input: saveObjectiveInput!) {
    saveObjective(input: $input) {
      payload {
        id
      }
    }
  }
`;

export const SteppedForm = ({ children, questionId, status }) => {
  const allSteps = children.map((x) => x.props["step"]);
  const minStep = Math.min(...allSteps);
  const maxStep = Math.max(...allSteps);
  const [currentStep, setCurrentStep] = useState(minStep);
  const [submitNext, setSubmitNext] = useState(false);
  const [errorsModalShowing, setErrorsModalShowing] = useState(false);
  const [errorsList, setErrorList] = useState([]);
  const [confirmCompletion, setConfirmCompletion] = useState(false);

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, maxStep));
    setSubmitNext(currentStep === maxStep);
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, minStep));
    setSubmitNext(false);
  };

  const { register, handleSubmit, control, setValue, getValues } = useForm();

  const [saveQuestion] = useMutation(SAVE_QUESTION);

  const onSubmit = async (inputs) => {
    const inputValues = formatInput(inputs);
    inputValues.status = "pending";

    if (questionId) {
      inputValues.id = questionId;
    }

    const errors = validateQuestionInputs(inputValues);

    if (errors.length === 0) {
      setConfirmCompletion(async () => {
        await saveQuestion({
          variables: {
            input: {
              objectiveQuestion: inputValues,
            },
          },
        });

        window.location = "/";
      });
    } else {
      setErrorsModalShowing(true);
      setErrorList(errors);
    }
  };

  const saveDraft = async () => {
    const inputValues = formatInput(getValues());
    inputValues.status = "draft";

    if (questionId) {
      inputValues.id = questionId;
    }

    await saveQuestion({
      variables: {
        input: {
          objectiveQuestion: inputValues,
        },
      },
    });

    window.location = "/";
  };

  return (
    <>
      {errorsModalShowing && (
        <Modal>
          <Alert>Algumas validações falharam.</Alert>
          <ul>
            {errorsList.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>

          <Button
            onClick={() => setErrorsModalShowing(false)}
            className="mt-2 ml-auto"
          >
            OK!
          </Button>
        </Modal>
      )}
      {confirmCompletion && (
        <Modal
          closeButtonText="Não, ainda não está pronto."
          confirmButtonText="Sim, desejo finalizar."
          onClose={() => setConfirmCompletion(false)}
          onConfirm={confirmCompletion}
        >
          Ao finalizar uma questão o revisor selecionado será solicitado a
          revisar a questão. Tem certeza que está tudo certo para finalizar?
        </Modal>
      )}
      <Navigator needsConfirmation={true} />
      <div className="m-auto max-w-screen-md">
        <form
          className="h-full flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormContext.Provider value={{ register, control, setValue }}>
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
            {maxStep === currentStep &&
              (status === "draft" || status === undefined) && (
                <Button onClick={() => saveDraft()}>
                  Salvar como rascunho
                </Button>
              )}
            <Button
              onClick={() => handleNext()}
              type={submitNext ? "submit" : "button"}
            >
              {maxStep === currentStep ? "Finalizar" : "Prosseguir"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
