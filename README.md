# ⚔️ NPC Forge: Gerador Universal de Personagens
O NPC Forge é uma aplicação Full Stack desenvolvida para mestres de RPG que precisam de inspiração rápida. Utilizando a inteligência artificial do Google Gemini (2.5 Flash) e o modelo multimodal Nano Banana, o projeto gera fichas completas de NPCs com nome, história, atributos e retratos visuais, tudo adaptado ao sistema de RPG escolhido.

Este projeto foi construído como um exercício de reciclagem técnica, focando em tecnologias de ponta e arquitetura modular.

## 🚀 Tecnologias Utilizadas
Frontend
- React 19 + Vite
- TypeScript (Tipagem rigorosa)
- Tailwind CSS (Design Mobile-First e responsivo)
- Zustand (Gerenciamento de estado global leve)
- React Hook Form + Zod (Validação robusta de formulários)
- Lucide React (Ícones imersivos)

Backend (Oráculo)
- Node.js + Express
- Vercel AI SDK (Integração com modelos de linguagem)
- Google GenAI SDK (Geração de imagens nativa com Gemini 2.5 Flash Image)

## 🛠️ Configuração do Ambiente

O projeto é dividido em duas pastas: client (ou a raiz do Vite) e server.

1. Configuração do Servidor
Navegue até a pasta do servidor:
```sh
cd server
npm install
```
Crie um arquivo .env dentro da pasta server e adicione sua chave do Google AI Studio:
```sh
# Server .env
GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_aqui
PORT=3001
```
Nota: Você pode obter sua chave gratuitamente em aistudio.google.com

2. Configuração do Frontend
Navegue até a raiz do projeto (ou pasta client):
```sh
# Server .env
npm install
```

## 🏃 Como Rodar
Iniciar o Servidor
```sh
# Na pasta server
node .\index.js
```
Iniciar o Frontend
```sh
# Na pasta principal
npm run dev
```

Abra http://localhost:5173 no seu navegador (com visualização mobile recomendada).

## 📂 Estrutura de Pastas
```sh
├── src/                # Frontend React
│   ├── components/     # UI Components (NPCForm, NPCCard)
│   ├── services/       # Chamadas de API (aiService.ts)
│   ├── store/          # Estado Global com Zustand
│   ├── schemas/        # Validações Zod
│   └── types/          # Interfaces TypeScript
├── server/             # Backend Express
│   ├── server.ts       # Endpoints de Texto e Imagem
│   └── .env            # Chaves Privadas (Não versionado)
└── README.md
```

## 🎓 Aprendizados Relevantes

- Separação de Camadas: Migração de chamadas de API do cliente para o servidor por motivos de segurança (CORS e proteção de API Keys).
- UX em IA: Implementação de geração de imagem on-demand para economizar recursos e melhorar a percepção de velocidade.
- Prompt Engineering: Estruturação de system prompts para garantir que a IA responda sempre em JSON válido seguindo um contrato pré-definido.
- Estado Multimodal: Gerenciar dados de texto e fluxos de imagem em Base64 de forma assíncrona.