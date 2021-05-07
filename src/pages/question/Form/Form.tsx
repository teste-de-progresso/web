import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form';
import { List, ListItem, ListItemIcon, ListItemText, Dialog as DialogMaterial, DialogTitle, DialogContent as DialogMaterialContent, DialogContentText, DialogActions, } from '@material-ui/core';
import { MdError } from 'react-icons/md';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { EnunciationFormStep, AnswerFormStep, DistractorsFormStep, FeaturesFormStep } from './steps'
import { SteppedForm, Step } from './SteppedForm'
import { FormProvider } from './FormContext'
import { Button, Dialog, DialogContent, DialogButton, AlertV2Props, AlertV2 } from '../../../components';

import { Question, QuestionCreateInput } from '../../../__generated__/graphql-schema';
import { formatInput } from '../formatInputs';
import { validateQuestionInputs } from '../../../utils/questions/questionValidations';
import { RootState } from '../../../services/store';

type Props = {
  question?: Question
  onSubmit?: (inputs: any) => void
  onDraftSubmit?: (inputs: any) => void
  alert?: AlertV2Props
}

export const Form: FC<Props> = ({ question, onSubmit, onDraftSubmit, alert }) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [confirmFinishModalOpen, setConfirmFinishModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false);
  const history = useHistory();
  const unsavedChanges = useSelector((state: RootState) => state.unsavedChanges)

  const minStep = 0;
  const maxStep = 3;
  const onFirstStep = currentStep === minStep;
  const onLastStep = currentStep === maxStep;

  const handleNextStep = () => {
    if (onLastStep) return

    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (onFirstStep) return

    setCurrentStep(currentStep - 1)
  }

  const { register, control, setValue, getValues } = useForm()

  const getFormatedValues = () => formatInput(getValues())

  const handleSave = () => {
    const inputs = { status: 'pending', ...getFormatedValues() } as QuestionCreateInput
    const errors = validateQuestionInputs(inputs)

    setConfirmFinishModalOpen(false)

    if (onSubmit && !errors.length) {
      onSubmit(inputs)
    } else {
      setValidationErrors(errors)
    }
  }

  const confirmLeave = () => {
    if (unsavedChanges && !confirmLeaveDialog) {
      setConfirmLeaveDialog(true);
    } else {
      history.push('/')
    }
  };

  const handleDraftSave = () => {
    if (onDraftSubmit) {
      onDraftSubmit({ status: 'draft', ...getFormatedValues() } as QuestionCreateInput)
    }
  }

  return (
    <FormProvider formHooks={{ register, control, setValue, question }}>
      {alert && (
        <AlertV2 severity={alert.severity} text={alert.text}></AlertV2>
      )}
      <DialogMaterial open={confirmLeaveDialog} onClose={() => setConfirmLeaveDialog(false)}>
        <DialogTitle>Modificações não Salvas</DialogTitle>
        <DialogMaterialContent>
          <DialogContentText>
            Todas as alterações serão descartadas. Deseja continuar?
          </DialogContentText>
        </DialogMaterialContent>
        <DialogActions>
          <Button secondary onClick={() => setConfirmLeaveDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={() => confirmLeave()}>
            Confirmar
          </Button>
        </DialogActions>
      </DialogMaterial>
      <Dialog
        open={!!validationErrors.length}
        onClose={() => setValidationErrors([])}
        title="Falha de Validação"
      >
        <DialogContent>
          <List>
            {validationErrors?.map((errorMessage) => (
              <ListItem key={errorMessage}>
                <ListItemIcon>
                  <MdError />
                </ListItemIcon>
                <ListItemText primary={errorMessage} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogButton>
          <Button
            onClick={() => setValidationErrors([])}
            className="ml-auto mx-2"
          >
            Sair
          </Button>
        </DialogButton>
      </Dialog>
      <Dialog
        open={confirmFinishModalOpen}
        onClose={() => setConfirmFinishModalOpen(false)}
        title="Finalização de Questão"
      >
        <DialogContent>
          Ao finalizar a questão, o revisor receberá uma notificação para
          revisá-la. Deseja continuar?
        </DialogContent>
        <DialogButton>
          <Button className="mx-2 ml-auto" secondary onClick={() => setConfirmFinishModalOpen(false)}>
            Cancelar
          </Button>
          <Button className="mx-2" onClick={() => handleSave()}>
            Finalizar
          </Button>
        </DialogButton>
      </Dialog>
      <form className="m-auto max-w-screen-md">
        <SteppedForm
          currentStep={currentStep}
          className="mb-3"
        >
          <Step step={0}>
            <EnunciationFormStep />
          </Step>
          <Step step={1}>
            <AnswerFormStep />
          </Step>
          <Step step={2}>
            <DistractorsFormStep />
          </Step>
          <Step step={3}>
            <FeaturesFormStep />
          </Step>
        </SteppedForm>

        <div className="mx-3 sm:mx-0 flex justify-items-center flex-col-reverse sm:flex-row justify-end space-x-0 sm:space-x-2">
          <Button
            className={"mb-3 sm:mb-0"}
            onClick={() => confirmLeave()}
            secondary
          >
            Cancelar
          </Button>
          <Button
            className={`mb-3 sm:mb-0 ${onFirstStep ? "hidden" : ""}`}
            onClick={() => handlePreviousStep()}
          >
            Retornar
          </Button>
          {(question?.status === "draft" || question?.status === undefined) &&
            <Button className={"mb-3 sm:mb-0"} onClick={handleDraftSave}>
              Salvar Rascunho
            </Button>
          }
          <Button
            className={`mb-3 sm:mb-0 ${onLastStep ? "hidden" : ""}`}
            onClick={() => handleNextStep()}
          >
            Prosseguir
          </Button>
          {onLastStep &&
            <Button className={"mb-3 sm:mb-0"} onClick={() => setConfirmFinishModalOpen(true)}>
              Finalizar
            </Button>
          }
        </div>
      </form>
    </FormProvider>
  )
}