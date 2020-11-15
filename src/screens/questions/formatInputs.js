export const formatInput = (inputs) => ({
  id: inputs.id,
  instruction: inputs.instruction,
  body: inputs.body,
  support: inputs.support,
  explanation: inputs.explanation,
  references: inputs.references,
  bloomTaxonomy: inputs.bloomTaxonomy === "" ? undefined : inputs.bloomTaxonomy,
  difficulty: inputs.difficulty === "" ? undefined : inputs.difficulty,
  source: inputs.source,
  checkType: inputs.checkType === "" ? undefined : inputs.checkType,
  authorshipYear: inputs.authorshipYear,
  subjectId: inputs.subjectId,
  reviewerId: inputs.reviewerId,
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
});
