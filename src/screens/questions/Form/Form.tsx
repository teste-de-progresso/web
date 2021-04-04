import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MdError } from 'react-icons/md';

import { EnunciationFormStep, AnswerFormStep, DistractorsFormStep, FeaturesFormStep } from './steps'
import { SteppedForm, Step } from './SteppedForm'
import { FormProvider } from './FormContext'
import { Button, Dialog, DialogContent, DialogButton, AlertV2Props, AlertV2 } from '../../../components';

import { Question, QuestionCreateInput } from '../../../graphql/__generated__/graphql-schema';
import { formatInput } from '../formatInputs';
import { validateQuestionInputs } from '../../../utils/questions/questionValidations';

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
            className="ml-auto"
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
          <Button secondary onClick={() => setConfirmFinishModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => handleSave()}>Finalizar</Button>
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

        <div className="flex justify-end space-x-2">
          <Button
            className={onFirstStep ? "hidden" : ""}
            onClick={() => handlePreviousStep()}
          >
            Retornar
          </Button>
          {(question?.status === "draft" || question?.status === undefined) &&
            <Button
              onClick={handleDraftSave}
            >
              Salvar Rascunho
              </Button>
          }
          <Button
            className={onLastStep ? "hidden" : ""}
            onClick={() => handleNextStep()}
          >
            Prosseguir
          </Button>
          {onLastStep &&
            <Button
              onClick={() => setConfirmFinishModalOpen(true)}
            >
              Finalizar
            </Button>
          }
        </div>
      </form>
    </FormProvider>
  )
}