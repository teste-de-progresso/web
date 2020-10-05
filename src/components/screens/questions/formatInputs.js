export const formatInput = (inputs) => {
  return {
    instruction: inputs.instruction,
    body: inputs.body,
    support: inputs.support,
    own: inputs.own,
    explanation: inputs.explanation,
    references: inputs.references,
    bloomTaxonomy: inputs.bloomTaxonomy,
    difficulty: inputs.difficulty,
    source: inputs.source,
    checkType: inputs.checkType,
    authorshipYear: inputs.authorshipYear,
    subjectId: inputs.subjectId,
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
};
