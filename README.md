# TODO-List App com Next.js

Uma aplicação web moderna e responsiva de lista de tarefas (Todo-List) construída com Next.js, TypeScript e Tailwind CSS.

Este projeto foi desenvolvido como parte de um teste técnico para a empresa **WhatsMenu**. O objetivo é demonstrar um conjunto de habilidades em desenvolvimento frontend, incluindo:
- Construção de aplicações web com **Next.js** e o **App Router**.
- Utilização de **TypeScript** para um código robusto e seguro.
- Manipulação de estado no React com hooks (incluindo hooks customizados).
- Criação de interfaces de usuário reativas e responsivas com **Tailwind CSS**.
- Implementação de uma suíte de testes completa (unitários e de integração) com **Vitest** e **React Testing Library**.
- Boas práticas de organização de código, componentização e manutenibilidade.

## Funcionalidades

*   **Adicionar Tarefas:** Interface limpa para adicionar novas tarefas com título e descrição opcional.
*   **Visualizar e Filtrar:** Exibe a lista de tarefas, permitindo filtrar por "Todas", "Incompletas" e "Completas".
*   **Marcar como Completa:** Permite marcar e desmarcar tarefas, com uma mudança visual clara para indicar o status.
*   **Editar Tarefas:** Funcionalidade de edição "in-place" que permite ao usuário modificar o título e a descrição de tarefas existentes.
*   **Excluir Tarefas:** Remove tarefas da lista com um diálogo de confirmação para evitar exclusões acidentais.
*   **Persistência de Dados:** As tarefas são salvas no `localStorage` do navegador.
*   **Testes Abrangentes:** O projeto inclui uma suíte de testes que cobre todas as funcionalidades CRUD.

---

## Decisões Técnicas e Arquitetura

### Estrutura do Projeto
A organização do código foi uma prioridade para garantir clareza e manutenibilidade. A estrutura de pastas segue um padrão comum em projetos React modernos:
- **`app/`**: Contém a lógica de roteamento e as páginas principais, utilizando o **App Router** do Next.js para aproveitar Server Components e Client Components de forma otimizada.
- **`components/`**: Abriga todos os componentes React reutilizáveis (`Button`, `Input`, `TaskItem`). Esta abordagem promove a consistência visual e a reutilização de código (DRY).
- **`hooks/`**: Lógicas complexas e reutilizáveis foram abstraídas em hooks customizados. O `useLocalStorage` encapsula a interação com a Web Storage API, e o `useIsClient` resolve o comum erro de hidratação (Hydration Mismatch) em aplicações SSR, demonstrando um entendimento de problemas do mundo real.
- **`types/`**: Centraliza todas as definições de tipo do TypeScript, como a interface `Task`, tornando o projeto mais seguro e fácil de entender.

---

## Live Demo

O projeto está disponível para visualização e teste no seguinte link:

*   https://todo-list-whatsmenu-mocha.vercel.app/

## Como Executar o Projeto Localmente

### Pré-requisitos

*   Node.js (versão 18 ou superior)
*   npm ou yarn
*   Git

### Instalação

1.  Clone o repositório para a sua máquina:
    ```bash
    git clone https://github.com/dusvak/todo-list-whatsmenu.git
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd todo-list-whatsmenu
    ```

3.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

### Execução

1.  Para iniciar o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

2.  Abra seu navegador e acesse `http://localhost:3000`.

### Executando os Testes

*   Para rodar os testes no terminal:
    ```bash
    npm run test
    ```
*   Para abrir a interface gráfica do Vitest:
    ```bash
    npm run test:ui
    ```

## Tecnologias Utilizadas

*   **Next.js**
*   **React**
*   **TypeScript**
*   **Tailwind CSS**
*   **tailwind-variants**
*   **Vitest**
*   **React Testing Library**
*   **ESLint**
