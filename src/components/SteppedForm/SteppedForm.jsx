import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { Dialog } from "@material-ui/core";

import { Button } from "../Button";
import { Alert } from "../Alert";

import { formatInput } from "../../screens/questions/formatInputs";
import { validateQuestionInputs } from "../../utils/validateQuestionInputs";

export const FormContext = React.createContext({
  register: undefined,
  control: undefined,
  setValue: undefined,
});

export const SteppedForm = ({ children, questionId, status }) => {
  const SAVE = loader("../../graphql/mutation/saveQuestion.gql");
  const SAVE_DRAFT = loader("../../graphql/mutation/saveQuestionDraft.gql");
  const allSteps = children.map((x) => x.props.step);
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

  const {
    register, handleSubmit, control, setValue, getValues,
  } = useForm();

  const [saveMutation] = useMutation(SAVE);
  const [saveDraftMutation] = useMutation(SAVE_DRAFT);

  const formatedInputs = () => formatInput(getValues());

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
      <Dialog
        open={errorsModalShowing}
        onClose={() => setConfirmCompletionModal(false)}
      >
        <div className="p-4">

          <Alert>Algumas validações falharam.</Alert>
          <ul>
            {errorsList.map((item, index) => <li key={index}>{item}</li>)}
          </ul>

          <Button
            onClick={() => setErrorsModalShowing(false)}
            className="mt-2 ml-auto"
          >
            OK!
          </Button>
        </div>
      </Dialog>
      <Dialog
        open={confirmCompletionModal}
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
      </Dialog>
      <div className="m-auto max-w-screen-md">
        <form
          className="h-full flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {questionId && (
            <input
              hidden
              value={questionId}
              readOnly
              ref={register}
              name="id"
            />
          )}
          <FormContext.Provider value={{ register, control, setValue }}>
            {children.map((x) => {
              const visible = x.props.step === currentStep;

              return (
                <div key={x.props.step} className={visible ? "" : "hidden"}>
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
            {maxStep === currentStep
              && (status === "draft" || status === undefined) && (
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
