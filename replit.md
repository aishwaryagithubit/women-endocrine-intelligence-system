# ENDORA — Women's Endocrine Intelligence System

## Overview

ENDORA is a women's health tracking and education platform focused on menstrual cycle tracking, endocrine intelligence, and reproductive health. It provides daily symptom tracking, cycle phase visualization, AI-powered health chat, learning modules, and doctor discovery. The app features bilingual support (English and Nepali).

The project uses a full-stack TypeScript architecture with a React frontend and Express backend. However, the frontend is designed to work independently using localStorage as a data layer (simulating backend operations), making it functional as a standalone demo while also having server-side API routes available.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (client/)
- **Framework**: React with TypeScript, built with Vite
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server/async state, Zustand for i18n store
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming. Uses a feminine premium palette (soft pinks, lavenders, teals) with custom fonts (Outfit for body, Playfair Display for headings)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Charts**: Recharts for health data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Data Layer (Dual-mode)
- **Frontend localStorage**: The `client/src/lib/storage.ts` file implements a complete localStorage-based API that simulates backend operations. This is the primary data layer currently used by the frontend hooks.
- **Backend PostgreSQL**: Drizzle ORM with PostgreSQL is configured but serves as the future production data layer. The server has Express API routes that mirror the localStorage API.
- **Storage keys**: `endora_users`, `endora_entries`, `endora_learning`, `endora_session`

### Backend (server/)
- **Framework**: Express 5 on Node.js
- **Database**: PostgreSQL via `node-postgres` (pg) pool, with Drizzle ORM
- **Storage**: `MemStorage` class implements an in-memory storage interface (`IStorage`) for development. Can be swapped for database-backed storage.
- **API Pattern**: RESTful routes under `/api/` prefix
- **Build**: esbuild for server bundling, Vite for client bundling (see `script/build.ts`)
- **Dev**: Vite dev server with HMR proxied through Express

### Shared Code (shared/)
- **Schema** (`shared/schema.ts`): Drizzle ORM table definitions for `users`, `entries`, and `learningProgress`. Uses `drizzle-zod` to generate Zod validation schemas from table definitions.
- **Routes** (`shared/routes.ts`): API route contract definitions with Zod schemas for input/output validation.

### Authentication
- **Demo/MVP mode**: Frontend-only auth using localStorage. No real password hashing or JWT — stores user object directly in localStorage session.
- **Server routes exist** for `/api/auth/login` and `/api/auth/signup` but use mock tokens and plaintext password comparison.
- Protected routes redirect unauthenticated users to the auth page and users who haven't completed onboarding to `/onboarding`.

### Key Pages/Routes
| Route | Purpose |
|-------|---------|
| `/` | Auth page (login/signup) |
| `/onboarding` | 3-step cycle configuration wizard |
| `/dashboard` | Cycle phase display, mood/energy charts, quick stats |
| `/tracking` | Daily symptom logging (pain, mood, energy, sleep, stress, symptoms) |
| `/learning` | Educational modules on reproductive health |
| `/chat` | Simulated AI health assistant |
| `/doctors` | Mock doctor directory with contact info |
| `/settings` | Profile, cycle config, language toggle |

### Internationalization
- Custom i18n system using Zustand store (`use-i18n.ts`)
- Supports English (`en`) and Nepali (`ne`)
- Translation keys defined inline as a record object

### Database Schema (PostgreSQL/Drizzle)
- **users**: id, username, password, name, language, cycleLength, periodLength, lastPeriodStart, onboardingCompleted
- **entries**: id, userId, date, cyclePhase, flow, painType, painIntensity, mood, energy, sleep, stress, symptoms (text array), notes
- **learningProgress**: id, userId, moduleId, completed, timestamp

Run `npm run db:push` to sync schema to database.

## External Dependencies

### Database
- **PostgreSQL**: Required for production. Connection via `DATABASE_URL` environment variable. Drizzle ORM manages schema and queries.

### Key NPM Packages
- `drizzle-orm` + `drizzle-kit` — ORM and migration tooling
- `express` v5 — HTTP server
- `@tanstack/react-query` — Async state management
- `framer-motion` — Animations
- `recharts` — Data visualization
- `react-hook-form` + `zod` — Form handling and validation
- `zustand` — Lightweight state management (i18n)
- `wouter` — Client-side routing
- `date-fns` — Date utilities
- `react-day-picker` — Calendar widget
- `vaul` — Drawer component
- `embla-carousel-react` — Carousel component
- Full shadcn/ui component library (Radix primitives)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Error overlay in development
- `@replit/vite-plugin-cartographer` — Development tooling
- `@replit/vite-plugin-dev-banner` — Development banner

### No External APIs
The application is designed to function without external paid APIs. The AI chat feature uses simulated responses. Doctor data is hardcoded mock data.