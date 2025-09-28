import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { parse } from 'yaml';
import { Pergunta, PerguntaEmbaralhada, ResultadoQuiz, EstadoResposta } from '../types/quiz.types';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = 'familia-quiz:score';

  private perguntasSource = new BehaviorSubject<PerguntaEmbaralhada[]>([]);
  private perguntaAtualIndexSource = new BehaviorSubject<number>(0);
  private acertosSource = new BehaviorSubject<number>(0);
  private estadoRespostaSource = new BehaviorSubject<EstadoResposta>(EstadoResposta.NAO_RESPONDIDA);
  private justificativaSource = new BehaviorSubject<string>('');

  readonly perguntas$ = this.perguntasSource.asObservable();
  readonly perguntaAtualIndex$ = this.perguntaAtualIndexSource.asObservable();
  readonly acertos$ = this.acertosSource.asObservable();
  readonly estadoResposta$ = this.estadoRespostaSource.asObservable();
  readonly justificativa$ = this.justificativaSource.asObservable();

  carregarPerguntas(): Observable<PerguntaEmbaralhada[]> {
    return this.http.get('assets/perguntas.yaml', { responseType: 'text' }).pipe(
      map((yamlContent: string) => {
        const perguntas = parse(yamlContent) as Pergunta[];
        const perguntasEmbaralhadas = this.embaralharPerguntas(perguntas);
        this.perguntasSource.next(perguntasEmbaralhadas);
        this.carregarProgresso();
        return perguntasEmbaralhadas;
      })
    );
  }

  private embaralharPerguntas(perguntas: Pergunta[]): PerguntaEmbaralhada[] {
    return this.shuffleArray([...perguntas]).map(pergunta => {
      const respostaCorreta = pergunta.alternativas[0]; // A primeira é sempre a correta
      const alternativasEmbaralhadas = this.shuffleArray([...pergunta.alternativas]);
      const novoIndiceResposta = alternativasEmbaralhadas.findIndex(alt => alt.texto === respostaCorreta.texto);

      return {
        ...pergunta,
        alternativas: alternativasEmbaralhadas,
        indiceRespostaCorreta: novoIndiceResposta
      };
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  responder(indiceAlternativa: number): void {
    const perguntas = this.perguntasSource.value;
    const perguntaAtualIndex = this.perguntaAtualIndexSource.value;
    const perguntaAtual = perguntas[perguntaAtualIndex];

    if (!perguntaAtual) return;

    const acertou = indiceAlternativa === perguntaAtual.indiceRespostaCorreta;
    const alternativaSelecionada = perguntaAtual.alternativas[indiceAlternativa];

    if (acertou) {
      this.acertosSource.next(this.acertosSource.value + 1);
      this.estadoRespostaSource.next(EstadoResposta.CORRETA);
    } else {
      this.estadoRespostaSource.next(EstadoResposta.INCORRETA);
    }

    this.justificativaSource.next(alternativaSelecionada?.justificativa || '');
    this.salvarProgresso();
  }

  proximaPergunta(): void {
    const proximoIndex = this.perguntaAtualIndexSource.value + 1;
    this.perguntaAtualIndexSource.next(proximoIndex);
    this.estadoRespostaSource.next(EstadoResposta.NAO_RESPONDIDA);
    this.justificativaSource.next('');
  }

  get perguntaAtual(): PerguntaEmbaralhada | undefined {
    const perguntas = this.perguntasSource.value;
    const index = this.perguntaAtualIndexSource.value;
    return perguntas[index];
  }

  get progresso(): string {
    const index = this.perguntaAtualIndexSource.value;
    const total = this.perguntasSource.value.length;
    return `${index + 1}/${total}`;
  }

  get quizFinalizado(): boolean {
    return this.perguntaAtualIndexSource.value >= this.perguntasSource.value.length;
  }

  calcularResultado(): ResultadoQuiz {
    const acertos = this.acertosSource.value;
    const total = this.perguntasSource.value.length;
    const porcentagem = Math.round((acertos / total) * 100);

    let mensagem = '';
    if (porcentagem < 50) {
      mensagem = 'Continue, você está no caminho!';
    } else if (porcentagem < 80) {
      mensagem = 'Bom! Que tal tentar melhorar?';
    } else if (porcentagem < 95) {
      mensagem = 'Excelente!';
    } else {
      mensagem = 'Perfeito! Parabéns!';
    }

    return { acertos, total, porcentagem, mensagem };
  }

  private salvarProgresso(): void {
    const dados = {
      acertos: this.acertosSource.value,
      perguntaAtualIndex: this.perguntaAtualIndexSource.value
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dados));
  }

  private carregarProgresso(): void {
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      this.acertosSource.next(dados.acertos || 0);
    }
  }

  reiniciarQuiz(): void {
    this.perguntaAtualIndexSource.next(0);
    this.acertosSource.next(0);
    this.estadoRespostaSource.next(EstadoResposta.NAO_RESPONDIDA);
    this.justificativaSource.next('');
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getMensagemMotivacional(acertou: boolean): string {
    if (acertou) {
      const mensagens = [
        'Muito bem!',
        'Excelente!',
        'Parabéns!',
        'Perfeito!',
        'Continue assim!'
      ];
      return mensagens[Math.floor(Math.random() * mensagens.length)] || 'Muito bem!';
    } else {
      const mensagens = [
        'Não desista!',
        'Você consegue!',
        'Continue tentando!',
        'Aprendemos com os erros!',
        'Vamos em frente!'
      ];
      return mensagens[Math.floor(Math.random() * mensagens.length)] || 'Não desista!';
    }
  }
}