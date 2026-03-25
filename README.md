# 🦷 DentalHub SaaS

Sistema SaaS para gestão de clínicas odontológicas, com foco em agendamentos, lembretes, autenticação e planos de assinatura.

---

## 🚀 Funcionalidades

### 👤 Autenticação

* Login com **GitHub** e **Google**
* Sessão segura com autenticação baseada em token
* Controle de acesso por usuário

### 📅 Agendamentos

* Criação de consultas
* Listagem de agendamentos por data
* Cancelamento de consultas

### 🔔 Lembretes

* Criar lembretes personalizados
* Listagem de lembretes
* Exclusão de lembretes

### 💳 Planos e Assinaturas

* Integração com Stripe
* Planos:

  * Basic
  * Professional
* Checkout e gerenciamento de assinatura

### 🖼️ Upload de Imagens

* Upload de imagens com Cloudinary
* Armazenamento externo otimizado

### 📊 Dashboard

* Visualização geral da clínica
* Interface moderna e responsiva

---

## 🛠️ Tecnologias utilizadas

* Next.js (App Router)
* TypeScript
* Prisma ORM
* PostgreSQL
* TailwindCSS
* Stripe
* Cloudinary
* NextAuth (Auth.js)

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd DentalHub-SaaS
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure o banco de dados

Certifique-se de ter um banco PostgreSQL rodando.

Depois rode:

```bash
npx prisma migrate dev
```

---

### 4. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`.

#### 🔐 Autenticação

```env
AUTH_SECRET=uma_chave_super_secreta
```

Você pode gerar uma com:

```bash
openssl rand -base64 32
```

---

#### 🗄️ Banco de dados

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/dentalhub"
```

---

#### 🔑 OAuth GitHub

1. Acesse: https://github.com/settings/developers
2. Crie um OAuth App

```env
AUTH_GITHUB_ID=seu_client_id
AUTH_GITHUB_SECRET=seu_client_secret
```

---

#### 🔑 OAuth Google

1. Acesse: https://console.cloud.google.com/
2. Crie credenciais OAuth

```env
AUTH_GOOGLE_ID=seu_client_id
AUTH_GOOGLE_SECRET=seu_client_secret
```

---

#### 🌐 URL da aplicação

```env
NEXT_PUBLIC_URL=http://localhost:3000
```

---

#### 💳 Stripe

1. Crie conta em: https://stripe.com
2. Pegue as chaves no dashboard

```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_SECRET_WEBHOOK_KEY=whsec_...

STRIPE_PLAN_BASIC=price_xxx
STRIPE_PLAN_PROFESSIONAL=price_xxx

STRIPE_SUCCESS_URL=http://localhost:3000/dashboard/plans
STRIPE_CANCEL_URL=http://localhost:3000/dashboard/plans
```

---

#### ☁️ Cloudinary

1. Crie conta em: https://cloudinary.com

```env
CLOUDINARY_NAME=seu_cloud_name
CLOUDINARY_KEY=sua_api_key
CLOUDINARY_SECRET=sua_api_secret
```

---

### 5. Rodar o projeto

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 📦 Estrutura do projeto

```
src/
 ├── app/
 │   ├── (panel)/dashboard/
 │   ├── api/
 │   └── auth/
 ├── components/
 ├── lib/
 └── prisma/
```

---

## 🧠 Observações importantes

* Certifique-se de configurar corretamente os **webhooks do Stripe**
* URLs de callback do OAuth devem apontar para:

```
http://localhost:3000/api/auth/callback/<provider>
```

Exemplo:

```
http://localhost:3000/api/auth/callback/github
```

---

## 📄 Licença

Este projeto é privado ou sob licença definida pelo autor.

---

## 👨‍💻 Autor

Desenvolvido por Guilherme Yuji Koyama Soken 🚀

---
