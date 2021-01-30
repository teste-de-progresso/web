import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";
import { MdError } from "react-icons/md";

import { Button } from "../Button";

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

  const save = async () => {
    await saveMutation({
      variables: {
        input: {
          question: formatedInputs(),
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
        <DialogTitle>
          Falha de Validação
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
              {errorsList.map((item) => (
                <ListItem key={item}>
                  <ListItemIcon>
                    <MdError />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setErrorsModalShowing(false)}
            className="mt-2 ml-auto"
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmCompletionModal}
        onClose={() => setConfirmCompletionModal(false)}
      >
        <DialogTitle>
          Finalização de Questão
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao finalizar a questão, o revisor receberá uma notificação para revisá-la. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button secondary onClick={() => setConfirmCompletionModal(false)}>
            Cancelar
          </Button>
          <Button onClick={() => save()}>
            Finalizar
          </Button>
        </DialogActions>
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
            {(status === "draft" || status === undefined) && (
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
