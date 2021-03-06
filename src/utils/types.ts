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
    label: "Aprovada com Alterações",
    description: "O autor deve efetuar as alterações solicitadas, mas não é necessário reenviar a questão ao revisor.",
    value: "comment",
  },
  {
    label: "Aprovada sem Alterações",
    description: "A questão está pronta para registro e não deve mais ser alterada.",
    value: "approve",
  },
  {
    label: "Pendente de Alterações",
    description: "O autor deve efetuar as alterações solicitadas e reenviar a questão ao revisor.",
    value: "request_change",
  },
];
