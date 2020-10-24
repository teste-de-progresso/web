export const CHECK_TYPE = [
  { key: "unique_answer", value: "Resposta Única" },
  { key: "incomplete_affirmation", value: "Afirmação Incompleta" },
  { key: "multiple_answer", value: "Resposta Múltipla" },
  { key: "negative_focus", value: "Foco Negativo" },
  { key: "assertion_and_reason", value: "Asserção e Razão" },
  { key: "gap", value: "Lacuna" },
  { key: "interpretation", value: "Interpretação" },
  { key: "association", value: "Associação" },
  { key: "ordering_or_ranking", value: "Ordenação ou Seriação" },
  { key: "constant_alternatives", value: "Alternativas Constantes" },
];

export const STATUS = [
  { key: "draft", value: "Rascunho" },
  { key: "pending", value: "Pendente" },
  { key: "finished", value: "Finalizada" },
];

export const DIFFICULTY = [
  { key: "easy", value: "Fácil" },
  { key: "medium", value: "Média" },
  { key: "hard", value: "Difícil" },
];

export const BLOOM_TAXONOMY = [
  { key: "remember", value: "Recordar" },
  { key: "understand", value: "Compreender" },
  { key: "apply", value: "Aplicar" },
  { key: "analyze", value: "Analisar" },
  { key: "evaluate", value: "Avaliar" },
  { key: "create", value: "Criar" },
];

export const REVIEW_FEEDBACK = [
  {
    label: "Comentário",
    description: "Envie um feedback geral sem aprovação explícita.",
    value: "comment"
  },
  {
    label: "Aprovação",
    description: "Enviar feedback e aprovar o uso em provas.",
    value: "approve"
  },
  {
    label: "Requisitar alterações",
    description: "Envie feedback que deve ser abordado antes do uso em provas.",
    value: "request_change"
  },
]
