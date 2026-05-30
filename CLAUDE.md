# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install deps, generate Prisma client, run migrations
npm run setup

# Development
npm run dev          # Next.js dev server with Turbopack
npm run dev:daemon   # Background dev server (logs to logs.txt)
npm run build
npm run lint

# Unit tests (Vitest)
npm run test

# Playwright E2E tests
npx playwright test                          # All tests
npx playwright test tests/functional/        # Functional suite only
npx playwright test tests/functional/login.spec.ts  # Single file
npx playwright test --ui                     # Interactive UI mode
npx playwright test --headed                 # Visible browser
npx playwright show-report                   # Open HTML report

# Database
npm run db:reset
```

## Architecture

This repo is two things in one:

1. **A Next.js 15 application** (`src/`) — UIGen, an AI-powered React component generator with live preview. Users describe components in a chat interface; Claude AI generates them in real-time with a virtual file system.

2. **A Playwright E2E test suite** (`tests/`) — tests that target *external* apps (CURA Healthcare, SauceDemo), used as a learning/demo project for Playwright patterns. The tests do **not** test the Next.js app itself.

### App source layout (`src/`)

- `app/` — Next.js App Router pages and API routes
- `components/` — Chat interface, file editor, preview, auth UI; unit tests live in `__tests__/` subdirs
- `lib/` — utilities, contexts, AI tools, JSX transformer, virtual file system
- `actions/` — server actions for project management
- `hooks/` — `useAuth` custom hook
- `generated/` — auto-generated Prisma types (do not edit)

The app uses Prisma with SQLite (`prisma/dev.db`). Anthropic API key goes in `.env` as `ANTHROPIC_API_KEY`; without it the app falls back to a mock provider with canned components.

### Playwright test layout (`tests/`)

```
tests/
├── demo/           # Educational/pattern-showcase tests
├── functional/     # Login, appointment booking, inventory tests
├── e2e/            # Empty — intended for app-level E2E
├── helpers/        # Empty — intended for shared utilities
└── page-objects/   # Empty — intended for Page Object Model
```

### Playwright config highlights

- **Browser:** Chromium only (Firefox/Safari commented out)
- **Reporters:** HTML (`playwright-report/`) + Allure Playwright
- **Retries:** 2 on CI, 0 locally
- **Workers:** 1 on CI, unlimited locally
- **Global timeout:** 10s; navigation timeout: 30s
- **Screenshots/video:** Captured only on failure; trace on first retry
- **Base URL:** Not set — tests navigate to full URLs directly

### Testing conventions in this repo

Prefer accessibility-first locators in order: `getByRole` → `getByLabel` → `getByText` → `getByPlaceholder` → `locator`. Avoid brittle CSS selectors where possible.

Functional tests share a `beforeEach` that handles login/navigation so individual tests only cover behavior. `demo/elem.handling.makeappt.spec.ts` is the reference file for element interaction patterns (dropdowns, checkboxes, radio buttons, date inputs, iteration over elements).
