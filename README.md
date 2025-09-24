🍽️ Mini Sistema de Gerenciamento de Restaurantes 🧑‍🍳
Este projeto é um sistema básico de gerenciamento de restaurantes desenvolvido com Next.js 14 (App Router) e TypeScript. Ele permite que usuários autenticados realizem operações CRUD em uma lista de estabelecimentos, com persistência de dados local.

✨ Funcionalidades
Login Local: Autenticação simples com usuário e senha fixos (admin/password).

Rotas Protegidas: Acesso ao dashboard restrito após login.

CRUD de Restaurantes:

Listagem: Visualização em tabela dos restaurantes cadastrados.

Criação: Adição de novos restaurantes (nome, cozinha, cidade, avaliação, status).

Edição: Atualização de informações existentes.

Exclusão: Remoção de restaurantes.

Persistência de Dados: Usa localStorage para manter os dados dos restaurantes salvos no navegador.

Busca e Filtragem: Campo de busca para filtrar restaurantes por nome.

Interface Moderna: Construído com shadcn/ui e estilizado com Tailwind CSS.

Feedback Visual: Notificações sonner para feedback de operações.

🚀 Tecnologias
Next.js 14 (App Router): Framework React.

React: Biblioteca de UI.

TypeScript: Tipagem estática.

Tailwind CSS: Estilização.

shadcn/ui: Componentes de UI.

Nookies: Gerenciamento de cookies.

Sonner: Notificações (toasts).

🛠️ Como Usar (Localmente)
Clone o repositório:
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO

Instale as dependências:
npm install

Inicie o servidor:
npm run dev

Acesse: http://localhost:3000/login

Credenciais:

Usuário: admin

Senha: sec00000@

🌐 Deploy
Este projeto é facilmente implantável na Vercel.
