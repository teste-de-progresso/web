import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";

import { Button } from "../Button";
import { Modal } from "../Modal";
import { Alert } from "../Alert";

import { formatInput } from "../../screens/questions/formatInputs";
import { validateQuestionInputs } from "../../utils/validateQuestionInputs";

export const FormContext = React.createContext({
  register: undefined,
  control: undefined,
  setValue: undefined,
});

const SAVE_DRAFT = gql`
  mutation($input: SaveDraftInput!) {
    saveQuestionDraft(input: $input) {
      payload {
        id
      }
    }
  }
`;

const SAVE = gql`
  mutation($input: SaveInput!) {
    saveQuestion(input: $input) {
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
  const [confirmCompletionModal, setConfirmCompletionModal] = useState(false);

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, maxStep));
    setSubmitNext(currentStep === maxStep);
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, minStep));
    setSubmitNext(false);
  };

  const { register, handleSubmit, control, setValue, getValues } = useForm();

  const [saveMutation] = useMutation(SAVE);
  const [saveDraftMutation] = useMutation(SAVE_DRAFT);

  const formatedInputs = () => {
    return formatInput(getValues());
  };

  const onSubmit = async (inputs) => {
    const inputValues = formatInput(inputs);

    const errors = validateQuestionInputs(inputValues);

    if (errors.length === 0) {
      setConfirmCompletionModal(true);
    } else {
      setErrorsModalShowing(true);
      setErrorList(errors);
    }
  };

  const saveDraft = async () => {
    const inputValues = formatInput(getValues());

    await saveDraftMutation({
      variables: {
        input: {
          question: inputValues,
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
      {confirmCompletionModal && (
        <Modal
          closeButtonText="Não, ainda não está pronto."
          confirmButtonText="Sim, desejo finalizar."
          onClose={() => setConfirmCompletionModal(false)}
          onConfirm={async () => {
            await saveMutation({
              variables: {
                input: {
                  question: formatedInputs(),
                },
              },
            });

            window.location = "/";
          }}
        >
          Ao finalizar uma questão o revisor selecionado será solicitado a
          revisar a questão. Tem certeza que está tudo certo para finalizar?
        </Modal>
      )}
      <div className="m-auto max-w-screen-md">
        <form
          className="h-full flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {questionId && (
            <input
              hidden
              value={questionId}
              readOnly={true}
              ref={register}
              name="id"
            ></input>
          )}
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
