# 🐕 NutriDog Pro

**Plataforma completa de nutrição canina com Inteligência Artificial**

NutriDog Pro é uma solução profissional para criação de dietas personalizadas para cães, utilizando IA avançada para garantir nutrição balanceada e saudável.

## 🚀 Funcionalidades Principais

### 🤖 Geração de Dietas com IA
- Dietas personalizadas baseadas em raça, idade, peso e condições de saúde
- Análise nutricional completa (proteínas, gorduras, carboidratos, vitaminas)
- Recomendações de porções e frequência alimentar
- Alertas sobre ingredientes tóxicos para cães

### 📦 Pantry Inteligente
- Gerenciamento de ingredientes disponíveis
- Detecção automática de alimentos perigosos
- Sugestões de receitas baseadas no estoque
- Controle de validade e quantidades

### ⚡ Quick Generate
- Geração instantânea de receitas em 1 clique
- Modo rápido para donos ocupados
- Receitas otimizadas com ingredientes disponíveis

### 📅 Planejamento Semanal
- Organize todas as refeições da semana
- Calendário visual interativo
- Lista de compras automática
- Notificações de preparo

### 👨‍🍳 Modo Cozinha
- Instruções passo a passo
- Timer integrado
- Modo mãos-livres com comandos de voz
- Dicas de preparo e conservação

### 📊 Evolução e Histórico
- Acompanhamento de peso e saúde
- Gráficos de progresso
- Histórico completo de dietas
- Relatórios exportáveis em PDF

### 🩺 Vet Connect
- Compartilhamento seguro com veterinários
- Relatórios nutricionais profissionais
- Integração com clínicas parceiras
- Histórico médico integrado

### 🛒 Marketplace
- Produtos e suplementos recomendados
- Ingredientes premium
- Cashback e programa de pontos
- Entrega rápida

## 🛠️ Tecnologias

- **Framework**: Next.js 15 com App Router
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Componentes**: Shadcn/ui + Radix UI
- **IA**: OpenAI GPT-4
- **Database**: Supabase
- **Analytics**: Vercel Analytics
- **Ícones**: Lucide React

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nutridog-pro.git

# Entre na pasta
cd nutridog-pro

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente Necessárias

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui

# OpenAI
OPENAI_API_KEY=sua_chave_openai_aqui

# Stripe (Pagamentos)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sua_chave_stripe_aqui
STRIPE_SECRET_KEY=sua_chave_secreta_stripe_aqui

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático a cada push na branch `main`

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📱 Estrutura do Projeto

```
nutridog-pro/
├── src/
│   ├── app/                 # Páginas e rotas (App Router)
│   │   ├── page.tsx        # Dashboard principal
│   │   ├── generate/       # Geração de dietas
│   │   ├── quick/          # Quick Generate
│   │   ├── pantry/         # Gerenciamento de ingredientes
│   │   ├── weekly/         # Planejamento semanal
│   │   ├── kitchen/        # Modo cozinha
│   │   ├── history/        # Histórico e evolução
│   │   ├── vet/            # Vet Connect
│   │   ├── market/         # Marketplace
│   │   └── subscription/   # Planos e assinaturas
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ui/            # Componentes base (shadcn)
│   │   └── custom/        # Componentes customizados
│   ├── lib/               # Utilitários e configurações
│   └── hooks/             # React hooks customizados
├── public/                # Arquivos estáticos
└── package.json          # Dependências
```

## 🎨 Design System

### Cores Principais
- **Azul Primário**: `#0F5A8A` - Confiança e profissionalismo
- **Dourado**: `#D9A441` - Premium e destaque
- **Verde**: `#4DAF7C` - Saúde e natural

### Tipografia
- **Títulos**: Geist Sans (bold)
- **Corpo**: Inter (regular)
- **Código**: Fira Code (monospace)

## 📄 Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados.

## 🤝 Suporte

Para suporte técnico ou dúvidas:
- Email: suporte@nutridog.pro
- WhatsApp: (11) 99999-9999
- Discord: [Comunidade NutriDog](https://discord.gg/nutridog)

## 🔄 Atualizações

Versão atual: **1.0.0**

Veja o [CHANGELOG.md](./CHANGELOG.md) para histórico completo de versões.

---

Desenvolvido com ❤️ para cães saudáveis e felizes 🐕
