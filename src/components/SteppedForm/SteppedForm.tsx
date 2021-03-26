import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { MdError } from "react-icons/md";

import { Button } from "../Button";

import { formatInput } from "../../screens/questions/formatInputs";
import { validateQuestionInputs } from "../../utils/questions/questionValidations";
import {
  Mutation,
  SaveDraftQuestionInput,
  Status,
} from "../../graphql/__generated__/graphql-schema";
import { AlertSeverity, AlertV2 } from "../../components/AlertV2";

type FormContextProps = {
  register?: any;
  control?: any;
  setValue?: any;
};

export const FormContext = React.createContext<FormContextProps>({
  register: undefined,
  control: undefined,
  setValue: undefined,
});

type Props = {
  children: any;
  status: Status;
  questionId?: string;
  setPageSaved?: any;
};

const SAVE_QUESTION_MUTATION = gql`
  mutation($input: SaveInput!) {
    saveQuestion(input: $input) {
      payload {
        id
      }
    }
  }
`;

const SAVE_DRAFT_QUESTION_MUTATION = gql`
  mutation($input: SaveDraftInput!) {
    saveQuestionDraft(input: $input) {
      payload {
        id
      }
    }
  }
`;

export const SteppedForm: FC<Props> = ({
  children,
  questionId,
  status,
  setPageSaved,
}) => {
  const allSteps = children.map((x: any) => x.props.step);
  const minStep = Math.min(...allSteps);
  const maxStep = Math.max(...allSteps);
  const [currentStep, setCurrentStep] = useState(minStep);
  const [submitNext, setSubmitNext] = useState(false);
  const [errorsModalShowing, setErrorsModalShowing] = useState(false);
  const [errorsList, setErrorList] = useState<any>([]);
  const [confirmCompletionModal, setConfirmCompletionModal] = useState(false);
  const [alert, setAlert] = useState<{
    state: boolean;
    severity: AlertSeverity;
    text: string;
  }>({ state: false, severity: "error", text: "" });

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, maxStep));
    setSubmitNext(currentStep === maxStep);
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, minStep));
    setSubmitNext(false);
  };

  const { register, handleSubmit, control, setValue, getValues } = useForm();

  const [saveMutation] = useMutation<Mutation>(SAVE_QUESTION_MUTATION);
  const [saveDraftMutation] = useMutation<Mutation>(
    SAVE_DRAFT_QUESTION_MUTATION
  );

  const formatedInputs = () => formatInput(getValues());

  const onSubmit = async (inputs: SaveDraftQuestionInput) => {
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

    try {
      await saveDraftMutation({
        variables: {
          input: {
            question: inputValues,
          },
        },
      });
      setAlert({
        state: true,
        severity: "success",
        text: "Rascunho salvo com sucesso",
      });

      setPageSaved(true)

      setTimeout(
        () => setAlert({ state: false, severity: "error", text: "" }),
        2000
      );
    } catch (e) {
      setAlert({
        state: true,
        severity: "error",
        text: `Erro ao salvar rascunho. ${e}`,
      });

      setPageSaved(false)

      setTimeout(
        () => setAlert({ state: false, severity: "error", text: "" }),
        8000
      );
    }
  };

  const save = async () => {
    try {
      await saveMutation({
        variables: {
          input: {
            question: formatedInputs(),
          },
        },
      })

      window.location.href = "/";
    } catch (e) {
      setAlert({
        state: true,
        severity: "error",
        text: `Erro ao salvar questão. ${e}. Por favor, tente novamente.`,
      });

      setPageSaved(false)

      setTimeout(
        () => setAlert({ state: false, severity: "error", text: "" }),
        8000
      );
    };

    setConfirmCompletionModal(false)
  };

  return (
    <>
      {alert.state && (
        <AlertV2 severity={alert.severity} text={alert.text}></AlertV2>
      )}
      <Dialog
        open={errorsModalShowing}
        onClose={() => setConfirmCompletionModal(false)}
      >
        <DialogTitle>Falha de Validação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
              {errorsList.map((item: any) => (
                <ListItem key={item}>
                  <ListItemIcon>
                    <MdError />
                  </ListItemIcon>
                  <ListItemText primary={item} />
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
        <DialogTitle>Finalização de Questão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao finalizar a questão, o revisor receberá uma notificação para
            revisá-la. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button secondary onClick={() => setConfirmCompletionModal(false)}>
            Cancelar
          </Button>
          <Button onClick={() => save()}>Finalizar</Button>
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
            {children.map((x: any) => {
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
              <Button onClick={() => saveDraft()}>Salvar Rascunho</Button>
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
