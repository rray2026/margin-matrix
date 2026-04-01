# CLAUDE.md — margin-matrix

A financial research dashboard (基金研究工具) built with React 19 + TypeScript + Vite. It displays macroeconomic indicators, industry analysis, company financials, and investment predictions. All data is currently mock/static — no backend API exists.

---

## Commands

```bash
npm run dev        # Start dev server (Vite HMR on localhost:5173)
npm run build      # TypeScript compile (tsc -b) then Vite production build
npm run lint       # ESLint with TypeScript + React rules
npm run preview    # Preview production build locally
```

**Build requirement:** `tsc -b` runs first and must pass with zero errors before Vite bundles. Fix all TypeScript errors before considering a build complete.

---

## Repository Structure

```
margin-matrix/
├── src/
│   ├── App.tsx                    # Root component; all tab/nav state lives here
│   ├── main.tsx                   # React entry point (StrictMode + createRoot)
│   ├── components/
│   │   ├── common/                # KpiCard, SectionTitle, ThemeToggle
│   │   ├── macro/                 # MacroTab + 5 chart components
│   │   ├── industry/              # IndustryTab + heatmap, charts, supply chain
│   │   ├── company/               # CompanyTab + selector, KPIs, charts, reports
│   │   ├── investment/            # PredictionPage, InvestmentLogicPage, MarketConsensusPage
│   │   └── settings/              # SettingsTab, ProductFeaturesPage, DataSourcesPage
│   ├── contexts/
│   │   └── ThemeContext.tsx       # isDark state; persisted to localStorage('theme')
│   ├── hooks/
│   │   ├── useIsMobile.ts         # 768px breakpoint, window resize listener
│   │   ├── useCompanyData.ts      # Loads company from mock map by ticker
│   │   ├── useChartHeight.ts
│   │   ├── useMacroData.ts
│   │   └── useIndustryData.ts
│   ├── layouts/
│   │   └── DashboardLayout.tsx    # Sticky header (48px mobile / 56px desktop) + content area
│   ├── mock/                      # All static data — no API calls anywhere
│   │   ├── companyData.ts         # companiesMap, defaultTicker='600519', generateCandles()
│   │   ├── macroData.ts
│   │   ├── industryData.ts
│   │   ├── investmentData.ts
│   │   └── supplychainData.ts
│   ├── styles/
│   │   ├── theme.ts               # Light/dark tokens, getChartStyles(), CHART_COLORS, SECTOR_COLORS
│   │   └── global.css             # Font stack (PingFang SC first), max-width 1600px, .change-* classes
│   └── types/
│       ├── company.ts             # CompanyInfo, CompanyKpi, CandlestickPoint, ResearchReport, …
│       ├── macro.ts
│       ├── industry.ts
│       └── investment.ts
├── .github/workflows/deploy.yml   # Cloudflare Pages deployment
├── vite.config.ts                 # Injects __BUILD_TIME__ global
├── tsconfig.app.json              # ES2023, strict, noUnusedLocals/Parameters
└── eslint.config.js               # Flat config (ESLint 9), react-hooks + react-refresh
```

---

## Navigation / State Architecture

All navigation state is owned by `App.tsx` using plain `useState`. There is no router library.

| State variable   | Type                                          | Controls                     |
|------------------|-----------------------------------------------|------------------------------|
| `activeMain`     | `'data' \| 'invest' \| 'settings'`            | Top-level tab                |
| `activeData`     | `'macro' \| 'industry' \| 'company'`          | Sub-tab under 数据           |
| `activeInvest`   | `'predictions' \| 'logic' \| 'consensus'`     | Sub-tab under 投资           |
| `activeSettings` | string (settings section key)                 | Sub-tab under 设置           |

`App.tsx` renders different top-level sections based on `activeMain`, then passes down setter props for sub-navigation. There is **no React Router** — never add routing libraries without discussion.

---

## Responsive Design

- `useIsMobile()` hook (breakpoint: 768px) drives **two separate render paths** in most components.
- Mobile: bottom navigation bar (`DashboardLayout` renders it), 48px header.
- Desktop: top navbar with hover dropdowns, 56px header.
- Ant Design grid: always use `xs={24}` for mobile columns; typical desktop column: `lg={12}`.
- Never mix the mobile/desktop render paths — keep them in separate `if (isMobile)` branches.

---

## Theming

- `ThemeContext` provides `{ isDark, toggleTheme }`.
- Theme tokens (colors, backgrounds) are defined in `src/styles/theme.ts`.
- All ECharts options must use `getChartStyles(isDark)` from `theme.ts` for background/text colors.
- Use `CHART_COLORS` for line/bar series colors; use `SECTOR_COLORS` for heatmaps (12 distinct colors).

---

## TypeScript Rules

`tsconfig.app.json` enables:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

**Never leave unused imports or variables** — the build will fail. Remove them or mark intentionally unused parameters with `_prefix`.

---

## Coding Conventions

### Component patterns
- Functional components only; no class components.
- Props typed via inline `interface` or local type aliases — not exported unless reused.
- Each component file is responsible for one visual unit. No "mega-components."
- Keep chart config objects (`option = { ... }`) co-located in the chart component file.

### Mock data
- All data lives in `src/mock/`. Do not scatter inline mock arrays inside components.
- When adding a new section, add its mock data file in `src/mock/` and a corresponding type file in `src/types/`.
- `companyData.ts` uses `generateCandles()` for procedural stock data — do not replace with hardcoded arrays.

### Styling
- **No Tailwind, no CSS Modules, no styled-components.** Use Ant Design props + inline `style={{}}` objects.
- Global utility classes (`.change-positive`, `.change-negative`, `.change-neutral`) are in `global.css`.
- Dashboard content max-width is 1600px (enforced in `global.css`).

### Chinese language
- All UI text is in Simplified Chinese. Keep it that way.
- Financial terminology: use standard A-share market conventions (e.g., 万亿, 亿, %, bps).

---

## Adding New Features

### New tab / page
1. Add a type entry to the relevant nav state in `App.tsx`.
2. Add an item to the corresponding `*_SUB_ITEMS` array in `App.tsx` (with icon, label, description, color).
3. Create a `src/components/<section>/YourPage.tsx`.
4. Add mock data in `src/mock/<section>Data.ts` and types in `src/types/<section>.ts`.
5. Wire the conditional render in `App.tsx`.

### New chart
1. Create a dedicated `XxxChart.tsx` in the appropriate section folder.
2. Accept `isDark` as a prop (or call `useTheme()` internally).
3. Build the ECharts `option` object using `getChartStyles(isDark)` for base styles and `CHART_COLORS` for series.
4. Use `echarts-for-react`'s `ReactECharts` component.

### New KPI card
- Reuse `src/components/common/KpiCard.tsx`. Do not create one-off KPI card implementations.

