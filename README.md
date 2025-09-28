# Quiz da Família - Angular 20.3.3

Um quiz educativo sobre uso consciente de tecnologia para famílias e educadores.

## 📋 Pré-requisitos

- **Node.js** 18+ 
- **Bun** (package manager)
- **Angular CLI** 20.3.3

## 🚀 Como executar

1. **Instalar dependências**:
   ```bash
   bun install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   bun start
   ```
   O aplicativo será aberto em `http://localhost:4200`

3. **Build para produção**:
   ```bash
   bun run build
   cp dist/familia-quiz/browser/index.html dist/familia-quiz/browser/404.html
   ```

## 🎯 Funcionalidades

- **10 perguntas** sobre uso consciente de tecnologia
- **Embaralhamento** de perguntas e alternativas
- **Feedback imediato** com justificativas
- **Sistema de pontuação** e progresso
- **Tema claro/escuro** alternável
- **Persistência** em localStorage
- **Responsivo** e acessível

## 🛠️ Tecnologias

- Angular 20.3.3 (Standalone + Zoneless)
- TypeScript (super strict)
- UnoCSS via PostCSS
- Less preprocessor
- ESLint
- Bun package manager

## 📱 Deploy

Configurado para GitHub Pages com baseHref `/familia-quiz/`.

## 📄 Licença

MIT License
