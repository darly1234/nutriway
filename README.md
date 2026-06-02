# NutriWay 🥗💧📊🩺

App mobile-web de saúde e nutrição com 4 módulos integrados.

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Zustand** (estado global persistido no localStorage)
- **Recharts** (gráficos)
- **Lucide React** (ícones)
- **date-fns** (datas)

## Módulos
| Módulo | Rota | Descrição |
|---|---|---|
| Dashboard | `/` | Painel integrado com resumo do dia |
| Cardápio | `/cardapio` | Planejamento alimentar por orçamento |
| Hidrata+ | `/hidrata` | Controle de hidratação + gamificação |
| NutriMeta | `/nutrimeta` | Peso, IMC e evolução corporal |
| CarboControl | `/carbo` | Contagem de carboidratos (TACO + Open Food Facts) |
| Configurações | `/settings` | Perfil, metas e limites |

## Base de dados
- **TACO (UNICAMP)** — 25 alimentos brasileiros embutidos (`src/lib/nutrition.ts`)
- **Open Food Facts API** — busca em tempo real para industrializados
- Hierarquia: TACO > Open Food Facts

## Integração entre módulos
- Cardápio confirmado → carbs sincronizados automaticamente no CarboControl
- Alimentos com alto teor de água → descontam da meta do Hidrata+
- Peso registrado no NutriMeta → atualiza meta hídrica do Hidrata+
- Cardápio com carb > limite → alerta antes de confirmar

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Acessar
http://localhost:3000
```

## Como fazer build para produção

```bash
npm run build
npm start
```

## Deploy (Vercel — gratuito)

```bash
npm install -g vercel
vercel
```

## Estrutura de arquivos

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz com Sidebar
│   ├── globals.css         # Estilos globais
│   ├── page.tsx            # Dashboard
│   ├── cardapio/page.tsx   # Módulo Cardápio
│   ├── hidrata/page.tsx    # Módulo Hidrata+
│   ├── nutrimeta/page.tsx  # Módulo NutriMeta
│   ├── carbo/page.tsx      # Módulo CarboControl
│   └── settings/page.tsx   # Configurações
├── components/
│   ├── layout/Sidebar.tsx  # Navegação lateral
│   └── ui/index.tsx        # Componentes reutilizáveis
├── lib/
│   ├── nutrition.ts        # TACO + Open Food Facts API
│   ├── store.ts            # Zustand global store
│   └── utils.ts            # Helpers
└── types/index.ts          # TypeScript types
```

## Como expandir no Cursor

- **Adicionar alimentos à TACO**: edite `src/lib/nutrition.ts` → array `TACO_FOODS`
- **Mudar limite de carb padrão**: edite `src/lib/store.ts` → `carb_limit_g: 250`
- **Adicionar novo módulo**: crie `src/app/novo-modulo/page.tsx` e adicione ao `Sidebar.tsx`
- **Conectar USDA**: adicione função em `src/lib/nutrition.ts` → `searchUSDA(query)`
- **Exportar PDF**: instale `jspdf` e crie `src/lib/export.ts`
- **Adicionar autenticação**: instale `next-auth` e envolva o layout

## Licença
MIT — livre para uso acadêmico e comercial.
