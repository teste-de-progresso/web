export const validateQuestionInputs = (inputs) => {
  const errors = [];

  const {
    alternatives,
    authorshipYear,
    body,
    explanation,
    references,
    subjectId,
    source,
    reviewerId,
  } = inputs;

  alternatives.forEach(({ correct, text }, index) => {
    if (correct && text.length <= 4) {
      errors.push('A resposta não está preenchida');
    } else if (text.length <= 4) {
      errors.push(`A ${index + 1}º alternativa incorreta não está preenchida`);
    }
  });

  if (!authorshipYear) {
    errors.push('O ano não está preenchido');
  }

  if (!body || body.length <= 5) {
    errors.push('O enunciado não está preenchido');
  }

  if (!explanation || explanation.length <= 5) {
    errors.push('A explicação da resposta não está preenchida');
  }

  if (!references || references.length <= 5) {
    errors.push('As referências da resposta não estão preenchidas');
  }

  if (!subjectId) {
    errors.push('Nenhum assunto foi selecionado');
  }

  if (!reviewerId) {
    errors.push('Nenhum revisor foi selecionado');
  }

  if (!source || source.length === 0) {
    errors.push('Nenhuma fonte informada');
  }

  return errors;
};
