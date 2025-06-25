# MediCalib - Sistema de Gestão de Calibração de Equipamentos

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=electron&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

Sistema de desktop multiplataforma para o gerenciamento completo do ciclo de calibração e manutenção de equipamentos médico-hospitalares.

---

## 📋 Tabela de Conteúdos

1.  [Sobre o Projeto](#-sobre-o-projeto)
2.  [Principais Funcionalidades](#-principais-funcionalidades)
3.  [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4.  [Como Começar](#-como-começar)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação](#instalação)
5.  [Estrutura do Projeto](#-estrutura-do-projeto)
6.  [Autor](#-autor)

---

## 🎯 Sobre o Projeto

O **MediCalib** foi desenvolvido para solucionar os desafios enfrentados na gestão de equipamentos médicos, substituindo processos manuais, baseados em planilhas e papéis, por uma solução digital, centralizada e segura.

O sistema visa resolver os seguintes problemas:
* ❌ **Risco de Erros Humanos:** A automação reduz falhas de digitação e perda de dados.
* 🔎 **Falta de Rastreabilidade:** Cria um histórico digital completo e auditável para cada equipamento.
* 📄 **Dificuldade na Geração de Laudos:** Padroniza e automatiza a criação de laudos técnicos em PDF.
* 🚨 **Riscos de Conformidade:** Ajuda a garantir que os registros estejam em conformidade com as normas técnicas.

---

## ✨ Principais Funcionalidades

* **Autenticação Segura:** Controle de acesso com perfis de **Técnico** e **Administrador**.
* **Gestão de Equipamentos:** Cadastro, edição, visualização e exclusão de equipamentos (CRUD).
* **Registro de Calibração:** Formulário detalhado para registrar dados técnicos e ambientais de cada calibração.
* **Geração de Laudos em PDF:** Criação automática de laudos profissionais com status de conformidade ("Dentro" ou "Fora").
* **Agendamento de Manutenção:** Ferramenta para planejar manutenções preventivas e corretivas.
* **Gestão de Usuários:** Painel exclusivo para o Administrador gerenciar as contas de acesso.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **Core da Aplicação:**
    * [Electron](https://www.electronjs.org/): Framework para criar aplicações de desktop com tecnologias web.
    * [Node.js](https://nodejs.org/): Ambiente de execução para o backend (processo principal).
* **Interface do Usuário (Frontend):**
    * [React.js](https://react.dev/): Biblioteca para construir a interface do usuário.
* **Banco de Dados:**
    * [SQLite](https://www.sqlite.org/index.html): Banco de dados relacional embutido, ideal para aplicações desktop.
    * [better-sqlite3](https://github.com/WiseLibs/better-sqlite3): Driver de alta performance para a comunicação com o SQLite.
* **Geração de Documentos:**
    * [PDFKit](http://pdfkit.org/): Biblioteca para a criação de documentos PDF.
* **Build e Empacotamento:**
    * [Webpack](https://webpack.js.org/): Empacotador de módulos para o frontend.
    * [Babel](https://babeljs.io/): Transpilador de JavaScript para garantir compatibilidade.
    * [Electron Builder](https://www.electron.build/): Ferramenta para gerar os instaladores multiplataforma.

---

## 🚀 Como Começar

Siga estas instruções para obter uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Você precisa ter o [Node.js](https://nodejs.org/en/download/) (que inclui o npm) instalado na sua máquina.

### Instalação

1.  Clone o repositório para a sua máquina local:
    ```sh
    git clone [https://github.com/seu-usuario/medicalib.git](https://github.com/seu-usuario/medicalib.git)
    ```
2.  Navegue até o diretório do projeto:
    ```sh
    cd medicalib
    ```
3.  Instale todas as dependências do projeto:
    ```sh
    npm install
    ```

### Executando a Aplicação

Para iniciar a aplicação em modo de desenvolvimento, execute o seguinte comando:
```sh
npm start

---
📂 Estrutura do Projeto
A estrutura de pastas do projeto está organizada da seguinte forma:

medicalib/
├── dist/                  # Arquivos de build para produção
├── node_modules/          # Dependências do projeto
├── src/
│   ├── components/        # Componentes React reutilizáveis (Login, EquipmentList, etc.)
│   ├── styles/            # Arquivos de estilização (CSS)
│   ├── database.js        # Lógica de conexão com o banco de dados
│   ├── main.js            # Ponto de entrada do Processo Principal (backend)
│   ├── preload.js         # Script de ponte entre Main e Renderer
│   ├── renderer.js        # Ponto de entrada do Processo de Renderização (frontend)
│   └── index.html         # Template HTML principal
├── package.json           # Definições e scripts do projeto
└── ...
---
👨‍💻 Autor
João Augusto Antonow Messias - (jaam)
