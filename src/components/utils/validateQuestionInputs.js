export const validateQuestionInputs = (inputs) => {
  let errors = []

  inputs.alternatives.forEach(({ correct, text }, index) => {
    if (correct && text.length <= 4) {
      errors.push(`A resposta não está preenchida`)
    } else if (text.length <= 4) {
      errors.push(`A ${index + 1}º alternativa incorreta não está preenchida`)
    }
  })

  if (inputs.authorshipYear.length === 0) {
    errors.push("O ano não está preenchido")
  }

  if (inputs.body.length <= 5) {
    errors.push("O enunciado não está preenchido")
  }

  if (inputs.instruction.length <= 5) {
    errors.push("O texto de instrução não está preenchido")
  }

  if (inputs.support.length <= 5) {
    errors.push("O texto de suporte não está preenchido")
  }

  if (inputs.explanation.length <= 5) {
    errors.push("A explicação da resposta não está preenchida")
  }

  if (inputs.references.length <= 5) {
    errors.push("As referências da resposta não estão preenchidas")
  }

  if (!inputs.subjectId) {
    errors.push("Nenhum assunto foi selecionado")
  }

  if (inputs.source.length === 0) {
    errors.push("Nenhuma fonte informada")
  }

  return errors
}