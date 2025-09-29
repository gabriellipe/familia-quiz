# 👨‍👩‍👧‍👦 Quiz da Família

> **Um quiz interativo sobre uso consciente de tecnologia em família**

Teste seus conhecimentos sobre como equilibrar o uso de dispositivos digitais no ambiente familiar. Uma ferramenta educativa para pais, educadores e todos que buscam um relacionamento mais saudável com a tecnologia.

---

## ✨ Por que este Quiz?

Em uma era digital, encontrar o equilíbrio entre tecnologia e vida familiar é um desafio constante. Este quiz foi criado para:

- 🎯 **Educar** sobre o uso consciente de tecnologia
- 🧠 **Provocar reflexões** sobre hábitos digitais familiares  
- 📚 **Compartilhar conhecimento** baseado em boas práticas
- 🏆 **Gamificar** o aprendizado com feedback imediato

## 🌟 Funcionalidades

### 🎮 Experiência de Quiz
- **10 perguntas cuidadosamente selecionadas** sobre tecnologia e família
- **Embaralhamento dinâmico** de perguntas e alternativas para cada sessão
- **Feedback educativo** com justificativas detalhadas para cada resposta
- **Sistema de pontuação** com mensagens motivacionais personalizadas

### 🎨 Interface & UX
- **Design responsivo** otimizado para mobile, tablet e desktop
- **Tema claro/escuro** com alternância automática baseada nas preferências do sistema
- **Animações suaves** e transições que melhoram a experiência
- **Acessibilidade** com suporte a leitores de tela

### 💾 Persistência & Progresso
- **Salvamento automático** do progresso no navegador
- **Continuação** de onde parou, mesmo fechando o navegador
- **Histórico de pontuação** para acompanhar a evolução

## 🚀 Começando

### Pré-requisitos
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Bun** como package manager ([Instalação](https://bun.sh/))

### Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/familia-quiz.git
   cd familia-quiz
   ```

2. **Instale as dependências**:
   ```bash
   bun install
   ```

3. **Execute o projeto**:
   ```bash
   bun start
   ```
   
   🎉 Abra [`http://localhost:4200`](http://localhost:4200) e comece a responder!

### Build para Produção

```bash
bun run build
# Para GitHub Pages, copie o index.html como 404.html
cp dist/familia-quiz/browser/index.html dist/familia-quiz/browser/404.html
```

## 🛠️ Tecnologias

### Frontend Moderno
- **Angular 20.3.3** com Standalone Components
- **TypeScript** em modo strict para máxima segurança de tipos
- **Signals** para reatividade otimizada

### Styling & Design
- **UnoCSS** para CSS utilitário de alta performance
- **CSS Variables** para sistema de temas consistente
- **PostCSS** para processamento otimizado

### Ferramentas de Desenvolvimento
- **ESLint** com regras rigorosas para qualidade de código
- **Bun** para gerenciamento de dependências ultrarrápido
- **Angular CLI** para scaffolding e build

### Arquitetura
- **Component-based** com separação clara de responsabilidades
- **Services** para lógica de negócio e estado global
- **YAML** para configuração de conteúdo externalizável
- **Lazy Loading** para otimização de performance

## 📊 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   ├── services/           # Lógica de negócio e estado
│   ├── types/              # Definições TypeScript
│   └── shared/             # Componentes compartilhados
├── assets/
│   ├── perguntas.yaml      # Banco de perguntas
│   └── mensagens.yaml      # Mensagens motivacionais
└── styles.css              # Sistema de design global
```

## 🎯 Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Ideias para Contribuições
- 📝 Adicionar novas perguntas no arquivo `perguntas.yaml`
- 🎨 Melhorar animações e transições
- ♿ Aprimorar acessibilidade
- 🌍 Adicionar suporte a múltiplos idiomas
- 📱 Otimizações para PWA

## 📱 Deploy

O projeto está configurado para **GitHub Pages** com:
- Build automatizado via GitHub Actions
- baseHref otimizado para subdominios
- Fallback para Single Page Application

## 🤝 Sobre

Este projeto foi desenvolvido com o objetivo de promover o uso consciente de tecnologia em famílias, baseado em pesquisas e boas práticas de educação digital.

---

### 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

### 💡 Inspiração

> *"A tecnologia é melhor quando aproxima as pessoas."* - Matt Mullenweg

---

**Gostou do projeto? Deixe uma ⭐ para apoiar!**
