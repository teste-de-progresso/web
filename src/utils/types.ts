export const CHECK_TYPE = [
  { value: "unique_answer", label: "Resposta Única" },
  { value: "incomplete_affirmation", label: "Afirmação Incompleta" },
  { value: "multiple_answer", label: "Resposta Múltipla" },
  { value: "negative_focus", label: "Foco Negativo" },
  { value: "assertion_and_reason", label: "Asserção e Razão" },
  { value: "gap", label: "Lacuna" },
  { value: "interpretation", label: "Interpretação" },
  { value: "association", label: "Associação" },
  { value: "ordering_or_ranking", label: "Ordenação ou Seriação" },
  { value: "constant_alternatives", label: "Alternativas Constantes" },
];

export const STATUS = [
  { value: "draft", label: "Rascunho" },
  { value: "pending", label: "Pendente" },
  { value: "approved", label: "Aprovada" },
  { value: "finished", label: "Finalizada" },
];

export const DIFFICULTY = [
  { value: "easy", label: "Fácil" },
  { value: "medium", label: "Média" },
  { value: "hard", label: "Difícil" },
];

export const BLOOM_TAXONOMY = [
  { value: "remember", label: "Recordar" },
  { value: "understand", label: "Compreender" },
  { value: "apply", label: "Aplicar" },
  { value: "analyze", label: "Analisar" },
  { value: "evaluate", label: "Avaliar" },
  { value: "create", label: "Criar" },
];

export const REVIEW_FEEDBACK = [
  {
    label: "Comentário",
    description: "Envie um feedback geral sem aprovação explícita.",
    value: "comment",
  },
  {
    label: "Aprovação",
    description: "Enviar feedback e aprovar o uso em provas.",
    value: "approve",
  },
  {
    label: "Requisitar alterações",
    description: "Envie feedback que deve ser abordado antes do uso em provas.",
    value: "request_change",
  },
];
