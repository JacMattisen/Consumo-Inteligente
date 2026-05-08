# 💰 Consumo Inteligente 50-30-20

O **Consumo Inteligente** é um dashboard de gestão financeira pessoal que aplica automaticamente o método **50-30-20**. Diferente de uma simples lista de gastos, o sistema educa o usuário sobre sua saúde financeira, distribuindo rendas e despesas em pilares estratégicos.

---

## 🚀 Funcionalidades

- **Gestão de Rendas:** Cadastro de salário e rendas extras para cálculo dinâmico de orçamento.
- **Lançamento de Gastos:** Cadastro de despesas com categorização inteligente vinculada à regra financeira.
- **Insights 50-30-20:** Painel que monitora em tempo real se você está dentro dos limites:
  - **50% (Essenciais):** Moradia, saúde e alimentação.
  - **30% (Estilo de Vida):** Lazer, hobbies e desejos.
  - **20% (Futuro):** Reserva de emergência e investimentos.
- **Gráfico de Evolução:** Visualização clara da distribuição dos gastos através de gráficos de rosca dinâmicos.
- **Extrato Inteligente:** Lista de gastos com indicadores visuais por pilar.

---

## 🛠️ Tecnologias Utilizadas

- **React.js** (com TypeScript)
- **Tailwind CSS** (Estilização responsiva e suporte a temas)
- **Lucide React** (Ícones modernos)
- **Recharts** (Visualização de dados)
- **MockAPI** (Persistência de dados em nuvem)

---

## 📈 O Método 50-30-20

O projeto foi construído para reforçar uma metodologia de sucesso mundial para o equilíbrio financeiro:

1. **Necessidades (50%):** Gastos fundamentais para sobrevivência e manutenção.
2. **Desejos Pessoais (30%):** Gastos focados em bem-estar, estilo de vida e lazer.
3. **Futuro e Reserva (20%):** O que você reserva para o seu "eu" do amanhã (investimentos e reserva de emergência).

---

## ✨ Diferenciais

- **Arquitetura Limpa:** Separação clara entre componentes de UI, serviços de API e tipos TypeScript.
- **UX Adaptativa:** Interface moderna com suporte a temas **Light** e **Dark** para melhor conforto visual.
- **Educação Financeira:** O sistema não apenas lista valores, mas sugere ações baseadas no balanço atual.

---

## 🏗️ Arquitetura do Projeto

A estrutura de pastas foi organizada para garantir modularidade, facilitando a escalabilidade e a manutenção do código:

````text
consumoInteligente/
├── 📂 public/          # Ativos estáticos (ícones, favicons, etc.)
└── 📂 src/
    ├── 📂 components/  # Componentes reutilizáveis de UI e lógica parcial
    │   ├── Chart.tsx           # Gráficos de visualização (Recharts)
    │   ├── Insights.tsx        # Painel de análise 50-30-20
    │   ├── FormGasto.tsx       # Registro de novas despesas
    │   ├── FormRendimentos.tsx # Registro de entradas financeiras
    │   ├── ListaGastos.tsx     # Histórico detalhado de despesas
    │   └── ...                 # Footer, Navbar, Login, etc.
    ├── 📂 constantes/  # Valores fixos (Configuração das categorias)
    │   └── categorias.ts
    ├── 📂 service/     # Integração com API (Consumo de dados/Axios)
    │   └── consumo.ts
    ├── 📂 tipos/       # Definições de Interfaces TypeScript (Types)
    │   └── tipos.ts
    ├── 📂 views/       # Páginas principais (Telas completas)
    │   ├── Dashboard.tsx       # Tela principal de gestão
    │   └── LoginPage.tsx       # Tela de autenticação
    ├── App.tsx         # Componente raiz e estruturação
    ├── main.tsx        # Ponto de entrada da aplicação
    └── index.css       # Estilizações globais e variáveis de tema

---

---

## 🔮 Implementações Futuras

O projeto foi concebido para ser a base de um ecossistema financeiro completo. Planeamos expandir as capacidades da plataforma com:

- **🔐 Autenticação Real:** Implementação de JWT (JSON Web Tokens) para um sistema de login seguro e persistente.
- **📅 Metas de Curto e Longo Prazo:** Funcionalidade para criar "objetivos" (ex: Viagem, Carro Novo) com barra de progresso.
- **📊 Exportação de Relatórios:** Gerar ficheiros PDF ou Excel com o resumo mensal dos gastos e rendimentos.
- **🤖 Consultor de IA:** Um chat integrado que analisa os seus gastos e sugere onde pode economizar para atingir a meta dos 20% mais rápido.
- **🔔 Notificações:** Sistema de alertas para avisar quando um pilar (ex: Desejos 30%) estiver próximo do limite.

---

## 💻 Como Rodar o Projeto


1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/seu-usuario/consumoInteligente.git](https://github.com/seu-usuario/consumoInteligente.git)
````

```

2. **Instale as dependências:**

Bash
npm install

3. **Inicie o projeto:**

Bash
npm run dev

---

## 👩‍💻 Desenvolvedoras

Este projeto foi construído com dedicação por:

- **Vivian Santana** [GitHub](https://github.com/Vivian-Santana) | [LinkedIn](https://www.linkedin.com/in/vivian-s-santana/)
- **Jacqueline Mattisen** - [GitHub](https://github.com/JacMattisen) | [LinkedIn](https://www.linkedin.com/in/jacqueline-mattisen)

---

Este projeto foi desenvolvido como parte de um Hackathon pela **AdaTech**
```
