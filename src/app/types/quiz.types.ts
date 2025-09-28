export interface Alternativa {
  texto: string;
  justificativa: string;
}

export interface Pergunta {
  pergunta: string;
  alternativas: Alternativa[];
}

export interface PerguntaEmbaralhada extends Pergunta {
  indiceRespostaCorreta: number;
}

export interface ResultadoQuiz {
  acertos: number;
  total: number;
  porcentagem: number;
  mensagem: string;
}

export enum EstadoResposta {
  NAO_RESPONDIDA = 'nao-respondida',
  CORRETA = 'correta',
  INCORRETA = 'incorreta'
}