# 1lasthour — CFA Level 1 Study Companion

> Your last hour before the exam. Make it count.

A modern, free, and beautifully designed study platform for CFA Level 1 candidates. Built with React 19 + Vite, it delivers the complete CFA Level 1 curriculum — every topic, every module, every Learning Outcome Statement (LOS) — with key concepts and formulas rendered in a clean, searchable interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
  - [Routing](#routing)
  - [Data Fetching](#data-fetching)
  - [State Management](#state-management)
  - [Theme System](#theme-system)
  - [Content Protection](#content-protection)
- [CI/CD Pipeline](#cicd-pipeline)
- [Branch Strategy](#branch-strategy)
- [Design System](#design-system)
- [Testing](#testing)
- [Performance Budgets](#performance-budgets)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

1lasthour is a single-page React application that presents the full CFA Level 1 curriculum in a structured, navigable format. Each of the 10 topic areas is broken down into learning modules, and every module exposes its Learning Outcome Statements (LOS) with associated key concepts and KaTeX-rendered formulas.

The platform is intentionally free, requires no account, and is optimised for both desktop study sessions and last-minute mobile review.

---

## Features

| Feature                        | Description                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Complete CFA L1 Curriculum** | All 10 topic areas, 100+ modules, every LOS                                                       |
| **KaTeX Formula Rendering**    | Mathematical formulas rendered via KaTeX — crisp, instant, accessible                             |
| **LOS Tab Navigation**         | Per-module LOS navigator with prev/next controls and colour-coded tabs                            |
| **Smart Global Search**        | Real-time search across topics, modules, concepts, and formulas                                   |
| **Cheat Sheets**               | Quick-reference summaries for last-minute review                                                  |
| **Dark / Light Mode**          | System-aware theme with manual toggle; persisted to localStorage                                  |
| **Content Protection**         | Canvas-based text rendering, right-click blocking, HMAC-signed API requests, session watermarking |
| **Exam Info Page**             | Dedicated About the Exam page covering structure, weights, passing scores, and timeline           |
| **Responsive Design**          | Fully functional on mobile, tablet, and desktop                                                   |
| **Zero Sign-up Required**      | Open the site and start studying immediately                                                      |

---

## Tech Stack

| Layer           | Technology                            |
| --------------- | ------------------------------------- |
| Framework       | React 19 + Vite 8                     |
| Styling         | Tailwind CSS v4, clsx, tailwind-merge |
| Routing         | React Router v7                       |
| Server State    | TanStack React Query v5               |
| Client State    | Zustand v5                            |
| Math Rendering  | KaTeX / react-katex                   |
| Icons           | Lucide React                          |
| Analytics       | Vercel Analytics                      |
| Testing         | Vitest + Testing Library              |
| Linting         | ESLint (flat config) + Prettier       |
| Package Manager | pnpm 9.15                             |
| Node            | 22.x                                  |
| Deployment      | Vercel                                |

---

## Project Structure

```
1lasthour/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Main CI pipeline (lint, test, build, lighthouse)
│   │   ├── codeql.yml          # SAST security scanning
│   │   └── lighthouse.yml      # Standalone Lighthouse performance audit
│   ├── BRANCH_MANAGEMENT.md    # Branch protection setup guide
│   ├── CODEOWNERS              # Auto-review assignment
│   ├── dependabot.yml          # Automated dependency updates
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   └── robots.txt
├── scripts/
│   ├── check-bundle-size.js    # Bundle size gate (1500 KB total, 500 KB per chunk)
│   ├── validate-env.js         # Environment variable validator
│   └── validate.js             # Local pre-deployment validation orchestrator
├── src/
│   ├── assets/                 # Static assets (images, SVGs)
│   ├── components/
│   │   ├── layout/             # GlobalHeader, Layout, StandardPageLayout, ScrollToTop
│   │   └── ui/                 # Badge, Button, Card, CTABlock, Input, SearchBar,
│   │                           #   StatsBar, ThemeToggle, ZoomableImageModal, Loader,
│   │                           #   StateMessages (Loading/Error/NotFound)
│   ├── config/
│   │   ├── env.js              # Centralised VITE_* env access
│   │   └── routes.js           # Route constants and path builders
│   ├── constants/              # Global constants (LOS_COLORS)
│   ├── features/
│   │   ├── cfa/
│   │   │   ├── api/            # cfaApi — signedFetch wrappers for topics/modules
│   │   │   ├── components/     # ConceptItem, FormulaItem, FormulaTable, LOSContainer,
│   │   │   │                   #   LevelCard, NavItem, Section, TopicListCard
│   │   │   ├── constants/      # CFA level/topic/concept enums
│   │   │   ├── hooks/          # useTopicsQuery, useTopicQuery, useModuleQuery,
│   │   │   │                   #   useCFANavigation, useLevelData, cfaQueryKeys
│   │   │   ├── pages/
│   │   │   │   ├── AboutExamPage/      # Exam structure, weights, timeline
│   │   │   │   ├── CFALevel1Page/      # Level index (shared for L1/L2/L3)
│   │   │   │   ├── CFAPage/            # Level selector hub
│   │   │   │   ├── ModulePage/         # LOS tab view + legacy layout
│   │   │   │   ├── PrivacyPolicyPage/  # Privacy policy (accordion)
│   │   │   │   ├── TermsAndConditionsPage/
│   │   │   │   └── TopicPage/          # Module grid for a topic
│   │   │   └── store/          # cfaStore (Zustand — active level/topic/module)
│   │   ├── dashboard/
│   │   │   ├── components/     # GlobalSearchResults, SectionGroup
│   │   │   └── pages/          # DashboardPage
│   │   ├── landing/
│   │   │   ├── components/     # HeroSection, FeaturesSection, HowItWorksSection,
│   │   │   │                   #   PreviewSection, PricingSection, FAQSection,
│   │   │   │                   #   CTABannerSection, StatsSection, Footer
│   │   │   └── pages/          # LandingPage
│   │   └── misc/
│   │       └── pages/          # NotFound, ThemeDemo
│   ├── hooks/
│   │   ├── useBreadcrumbs.js   # URL-derived breadcrumb generator
│   │   ├── useProtection.js    # Content protection (keyboard blocks, devtools, print)
│   │   └── useZoomPan.js       # Pinch/scroll zoom + drag pan for image modal
│   ├── lib/
│   │   ├── botDetection.js     # Client-side headless browser heuristics
│   │   └── signedFetch.js      # HMAC-signed + AES-GCM encrypted API client
│   ├── providers/
│   │   ├── ThemeProvider.jsx   # React context for dark/light mode
│   │   └── index.jsx           # AppProviders (QueryClient + Theme)
│   ├── router/
│   │   └── AppRouter.jsx       # BrowserRouter with lazy-loaded routes
│   ├── services/
│   │   ├── httpClient.js       # Base fetch wrapper
│   │   └── queryClient.js      # TanStack QueryClient singleton
│   ├── store/
│   │   └── index.js            # Global Zustand store (search overlay)
│   ├── styles/
│   │   ├── index.css           # Tailwind imports + base layer + utility classes
│   │   ├── tokens.css          # CSS custom properties (light + dark tokens)
│   │   └── theme.js            # JS theme object (consumed by tailwind.config.js)
│   ├── types/
│   │   └── cfa.types.js        # JSDoc type definitions
│   └── utils/
│       ├── cn.js               # clsx + twMerge helper
│       ├── searchUtils.js      # Global search index builder + query
│       ├── tocHelpers.js       # Table-of-contents item builder
│       └── zoomPanHelpers.js   # Zoom/pan math utilities
├── .browserslistrc
├── .env.example
├── .eslintrc / eslint.config.js
├── .prettierrc
├── .secretlintrc.json
├── colorscheme.json            # Full brand color specification (v2)
├── lighthouserc.json           # Lighthouse CI thresholds
├── tailwind.config.js
├── vite.config.js
├── vitest.config.js
└── vercel.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 22.x
- **pnpm** ≥ 9.15.0 (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/1lasthour.git
cd 1lasthour

# Install dependencies
pnpm install

# Copy environment template and fill in values
cp .env.example .env
```

### Development

```bash
pnpm dev
# Server starts at http://localhost:1223
```

### Production Build

```bash
pnpm build
pnpm preview   # Preview the production build locally
```

---

## Environment Variables

All variables are prefixed with `VITE_` to be exposed to the browser via Vite's import.meta.env.

| Variable            | Required | Description                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `VITE_ENV`          | Yes      | Runtime environment — `development` or `production`                     |
| `VITE_API_BASE_URL` | Yes      | Base URL for the Fastify backend API (e.g. `https://api.1lasthour.com`) |
| `VITE_REQUEST_KEY`  | Yes      | Seed key used during session initialisation                             |

See `.env.example` for the full template. **Never commit `.env` files.**

---

## Available Scripts

```bash
pnpm dev              # Start Vite dev server (port 1223)
pnpm build            # Production build
pnpm preview          # Preview production build

pnpm lint             # ESLint with zero-warning policy
pnpm lint:fix         # Auto-fix ESLint violations
pnpm format           # Prettier write
pnpm format:check     # Prettier check (used in CI)
pnpm typecheck        # TypeScript type check via jsconfig.json

pnpm test             # Run Vitest in watch mode
pnpm test:run         # Single test run
pnpm test:ci          # CI test run with coverage
pnpm test:ui          # Vitest UI

pnpm check:bundle     # Assert bundle size limits (1500 KB total, 500 KB per chunk)
pnpm check:env        # Validate required env vars are present
pnpm check:secrets    # secretlint scan for accidentally committed secrets

pnpm validate         # Full local pre-deployment pipeline
pnpm validate:dry     # Preview pipeline stages without executing
pnpm validate:fix     # Pipeline with auto-fix mode enabled

pnpm lighthouse       # Run Lighthouse CI against ./dist
pnpm analyze          # Build + open bundle visualiser (dist/stats.html)
pnpm clean            # Remove dist and Vite cache
pnpm clean:all        # Remove dist and node_modules
```

---

## Architecture

### Routing

React Router v7 with lazy-loaded pages and a `<Suspense>` fallback spinner. Route structure:

```
/                          → LandingPage
/about-exam                → AboutExamPage
/privacy-policy            → PrivacyPolicyPage
/terms-and-conditions      → TermsAndConditionsPage

(Layout wrapper)
  /dashboard               → DashboardPage
  /cfa                     → CFAPage (level selector)
  /cfa/level-1             → CFALevel1Page
  /cfa/level-1/:topicId    → TopicPage
  /cfa/level-1/:topicId/:moduleId → ModulePage
  /cfa/level-2/*           → (same structure, CFALevel1Page detects level)
  /cfa/level-3/*           → (same structure)
  *                        → NotFound
```

### Data Fetching

All CFA content is fetched from the Fastify backend API via **TanStack React Query**. The `signedFetch` client in `src/lib/signedFetch.js` handles:

1. Session initialisation — `GET /api/v1/session/init` → receives `{ sessionId, signature, expiresAt }`
2. Per-request HMAC-SHA256 signing over `(sessionId + nonce + timestamp + path)` using the session signature as key
3. Transparent AES-GCM decryption of encrypted API responses
4. Automatic session refresh on 401

Query hooks live in `src/features/cfa/hooks/`:

```js
useTopicsQuery(level); // GET /api/v1/topics?level=1
useTopicQuery(topicId, level); // GET /api/v1/topics/:topicId?level=1
useModuleQuery(topicId, moduleId, level); // GET /api/v1/topics/:topicId/modules/:moduleId?level=1
```

All queries use a 1-hour `staleTime` to minimise network requests during a study session.

### State Management

| Store          | Technology                      | Responsibility                  |
| -------------- | ------------------------------- | ------------------------------- |
| Server state   | TanStack React Query            | API data — topics, modules, LOS |
| CFA navigation | Zustand (`cfaStore`)            | Active level / topic / module   |
| Global UI      | Zustand (`appStore`)            | Search overlay open/close state |
| Theme          | React Context (`ThemeProvider`) | Dark / light mode               |

### Theme System

The design token system has three layers:

1. **`src/styles/theme.js`** — JavaScript source of truth (typography, spacing, shadows, breakpoints)
2. **`src/styles/tokens.css`** — CSS custom properties for both `:root` (light) and `.dark` (dark mode)
3. **`tailwind.config.js`** — Maps CSS variables to Tailwind utility classes (`bg-bg`, `text-ink`, `text-brand-bright`, etc.)

The `ThemeProvider` reads from `localStorage` on mount, falls back to `prefers-color-scheme`, and writes back on every toggle. The `<html>` element receives a `dark` class, which activates all `.dark { ... }` overrides in `tokens.css`.

### Content Protection

The platform implements several layers of content protection:

- **`useProtection` hook** — Blocks right-click, copy, cut, drag, print shortcuts (F12, Ctrl+U, Ctrl+P, etc.), and DevTools detection via window size heuristics
- **`ProtectedText` component** — Renders text to an HTML `<canvas>` with anti-OCR pixel noise and session watermarks to prevent automated text extraction
- **`ProtectedBlock` component** — Transparent overlay that intercepts context menu and drag events on structured content
- **`index.html` canvas blocker** — Overrides `HTMLCanvasElement.toDataURL` and `toBlob` at the earliest possible moment to prevent canvas data extraction
- **`botDetection.js`** — Client-side heuristics to detect headless browsers (webdriver flag, PhantomJS globals, zero-dimension screens, Permissions API anomalies)
- **HMAC-signed API requests** — All backend requests carry a per-request cryptographic signature; the backend rejects any unsigned or replayed request

---

## CI/CD Pipeline

The CI pipeline (`.github/workflows/ci.yml`) runs on every push and pull request to `prod-fe` and `dev-fe`:

```
┌─────────────────────────┐  ┌───────────────┐  ┌───────────────────────────┐
│  static-analysis        │  │  test         │  │  build                    │
│  ─────────────────────  │  │  ─────────── │  │  ─────────────────────── │
│  • pnpm install         │  │  • pnpm install│  │  • pnpm install           │
│  • typecheck            │  │  • vitest ci  │  │  • Vite build (placeholders│
│  • ESLint (0 warnings)  │  │  • upload     │  │    for secrets)           │
│  • Prettier check       │  │    coverage   │  │  • check:bundle           │
│  • pnpm audit           │  │    artifact   │  │  • SLSA provenance attest │
│  • OSV-Scanner          │  └───────────────┘  │  • upload dist artifact   │
│  • ESLint cache         │                      └───────────────────────────┘
└─────────────────────────┘
                                     │
                                     ▼
                          ┌──────────────────────┐
                          │  lighthouse           │
                          │  ──────────────────── │
                          │  • download dist      │
                          │  • lhci autorun       │
                          └──────────────────────┘
                                     │
                                     ▼
                          ┌──────────────────────┐
                          │  ci-success (gate)    │
                          │  ──────────────────── │
                          │  All jobs must pass   │
                          └──────────────────────┘
```

`static-analysis`, `test`, and `build` run **in parallel**. `lighthouse` waits on `build`. The `ci-success` gatekeeper job enforces that all required checks pass before a PR can merge.

---

## Branch Strategy

| Branch      | Purpose                | Protected                                      |
| ----------- | ---------------------- | ---------------------------------------------- |
| `prod-fe`   | Production deployments | Yes — requires PR + 1 approval + all CI checks |
| `dev-fe`    | Development / staging  | Yes — requires PR + 1 approval + all CI checks |
| `feature/*` | Feature work           | No                                             |

All merges to `prod-fe` and `dev-fe` must go through a pull request. Direct pushes are blocked. The `CODEOWNERS` file automatically requests a review from `@adityaxrawal` on every change under `.github/`.

See `.github/BRANCH_MANAGEMENT.md` for the full GitHub branch protection setup guide.

---

## Design System

The brand palette is documented in `colorscheme.json` (v2). Key tokens:

| Token                               | Value                 | Usage                                       |
| ----------------------------------- | --------------------- | ------------------------------------------- |
| `--color-highlight` (spicy-paprika) | `#ec4e20`             | Primary CTAs, logo accent, active states    |
| `--color-brand`                     | `#2f6db4`             | Body text dark, headings, nav               |
| `--color-brand-bright`              | `#5b8bc5`             | Links, interactive buttons, topic tags      |
| `--color-secondary` (deep-saffron)  | `#ff9505`             | Hover states, hero accents, step connectors |
| `--color-bg`                        | `#ffffff` / `#0f172a` | Page background                             |
| `--color-surface`                   | `#f8fafc` / `#172033` | Card / panel background                     |

All tokens have both light and dark mode values defined in `src/styles/tokens.css`.

The full Tailwind mapping is in `tailwind.config.js`. Utility classes include `bg-bg`, `bg-surface`, `text-ink`, `text-ink-secondary`, `text-brand`, `text-highlight`, `border-border`, `shadow-card`, and more.

---

## Testing

Tests are written with **Vitest** and **React Testing Library**.

```bash
pnpm test:run      # Run all tests once
pnpm test:ci       # Run with coverage (CI mode)
pnpm test:ui       # Open Vitest browser UI
```

### Coverage Thresholds

| Metric     | Threshold |
| ---------- | --------- |
| Branches   | 75%       |
| Functions  | 80%       |
| Lines      | 80%       |
| Statements | 80%       |

### Test Files

```
src/features/cfa/pages/ModulePage/ModulePage.test.jsx
src/features/cfa/pages/ModulePage/useLOSTabSection.test.js
src/features/cfa/pages/ModulePage/useModulePage.test.js
src/features/dashboard/components/GlobalSearchResults/GlobalSearchResults.test.jsx
src/utils/__tests__/searchUtils.test.js
src/utils/__tests__/tocHelpers.test.js
src/utils/__tests__/zoomPanHelpers.test.js
src/utils/searchUtils.test.js
scripts/validate.test.js
```

---

## Performance Budgets

Enforced by `scripts/check-bundle-size.js` in CI and `lighthouserc.json` for runtime performance:

**Bundle Size Limits**

| Scope        | Limit    |
| ------------ | -------- |
| Single chunk | 500 KB   |
| Total bundle | 1,500 KB |

**Lighthouse Thresholds**

| Metric         | Threshold         |
| -------------- | ----------------- |
| Performance    | ≥ 80              |
| Accessibility  | ≥ 90              |
| Best Practices | ≥ 90              |
| SEO            | ≥ 80 (warn)       |
| LCP            | ≤ 4,000 ms        |
| TBT            | ≤ 300 ms          |
| CLS            | ≤ 0.1             |
| FCP            | ≤ 3,500 ms (warn) |
| TTI            | ≤ 3,800 ms (warn) |

Lighthouse CI runs 3 times per build and averages the results.

---

## Security

| Mechanism          | Implementation                                            |
| ------------------ | --------------------------------------------------------- |
| Secret scanning    | secretlint on every CI run                                |
| Dependency audit   | `pnpm audit --prod --audit-level=high`                    |
| OSV scanning       | google/osv-scanner-action                                 |
| SAST               | GitHub CodeQL (JavaScript) — weekly + on every push       |
| Dependency updates | Dependabot (weekly, grouped)                              |
| Build provenance   | SLSA Level 3 via `actions/attest-build-provenance`        |
| Pinned Actions     | All GitHub Actions are pinned to full commit SHAs         |
| API security       | HMAC-SHA256 request signing + AES-GCM response encryption |
| Bot detection      | Client-side headless browser heuristics                   |
| Content protection | Canvas rendering, keyboard blocking, watermarking         |

---

## Deployment

The application is deployed to **Vercel**.

`vercel.json` configuration:

- All routes rewrite to `/index.html` (SPA mode)
- Build command: `pnpm run build`
- Install command: `corepack enable pnpm && pnpm install`
- `prod-fe` branch deployments are gated by the `ignoreCommand` (CI must pass first)

Build-time secrets are **never baked** into CI artifacts. The Vite build uses placeholder values (`__API_URL_PLACEHOLDER__`, `__ENV_PLACEHOLDER__`, `__REQUEST_KEY_PLACEHOLDER__`) which are replaced at runtime by Vercel environment variables.

---

## Contributing

1. Fork the repository and create a feature branch off `dev-fe`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the project coding standards:
   - No direct imports from cross-feature deep paths — use barrel exports
   - Use path aliases (`@/`, `@components/`, `@features/`) over relative paths
   - All components must have `displayName` set
   - Use `memo()` for all presentational components
   - Prop types must be declared via PropTypes

3. Verify locally before pushing:

   ```bash
   pnpm validate:dry   # preview the pipeline
   pnpm validate       # run the full local pipeline
   ```

4. Open a Pull Request against `dev-fe`. The PR template will guide you through the required checklist.

5. All CI checks must pass and `@adityaxrawal` must approve before merging.

---

## License

Private project. All content is original and protected by copyright law. Reproduction, scraping, redistribution, or commercial use without written permission is strictly prohibited.

CFA® and Chartered Financial Analyst® are registered trademarks of CFA Institute. This platform is not affiliated with, sponsored by, or endorsed by CFA Institute.

---

<p align="center">Built with care for every CFA candidate. Free forever.</p>
