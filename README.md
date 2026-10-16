# Nivara Infrastructure — Enterprise Civil Construction Website & Admin CMS

A production-ready, enterprise-grade civil engineering and infrastructure website paired with an integrated administrative Content Management System (CMS). Inspired by the visual clarity, restrained industrial palette, and authoritative engineering presentation of global engineering contractors (e.g. Bechtel), featuring an original Nivara Infrastructure brand identity.

---

## Architecture Overview

This project is structured as an npm monorepo with JavaScript / JSX only (no TypeScript):

```
new_civil_project/
├── apps/
│   ├── web/                 # Next.js 14 App Router corporate site & CMS
│   │   ├── src/
│   │   │   ├── app/         # Server & client pages (Home, Projects, Services, About, Contact, Admin)
│   │   │   ├── components/  # Header, Footer, ProjectCard, LightboxGallery, VideoPlayer, ContactForm
│   │   │   └── lib/         # Server-side API client
│   │   ├── e2e/             # Playwright browser end-to-end tests
│   │   └── tailwind.config.js # Restrained industrial design token system
│   │
│   └── api/                 # Express.js REST API (Node ES modules)
│       ├── src/
│       │   ├── config/      # Mongoose DB, Zod env validation, Cloudinary signed upload service
│       │   ├── controllers/ # Public projects, admin projects, inquiries, auth, stats, media
│       │   ├── models/      # Project, User, Inquiry, AuditLog, MediaCleanupQueue
│       │   ├── middleware/  # Session auth, role-based RBAC, rate limiting, CSRF origin check
│       │   ├── routes/      # Versioned /api/v1 REST routes
│       │   └── scripts/     # seedAdmin.js, seedDemo.js
│       └── tests/           # Vitest & Supertest integration suite (23 tests)
│
├── docs/
│   └── DEPLOYMENT.md        # Production operations & deployment guide
├── .env.example             # Complete environment configuration template
├── package.json             # Root workspaces & convenient development scripts
└── README.md
```

---

## Design System

Designed around a restrained industrial palette:
* **Deep Navy:** `#0B1320`
* **Secondary Navy:** `#142238`
* **Pure White:** `#FFFFFF`
* **Concrete Gray:** `#F1F5F9`
* **Steel Gray:** `#334155`
* **Muted Text:** `#64748B`
* **Borders:** `#E2E8F0`
* **Industrial Orange:** `#EA580C` (used selectively for high-priority CTAs and status accents)

---

## Key Features

### 1. Public Corporate Website (`apps/web`)
* **Homepage (`/`):** Striking heavy civil hero imagery, corporate identity, core infrastructure sectors, dynamically fetched featured projects from MongoDB, execution methodology, safety/quality pillars, and tender call-to-actions.
* **Project Directory (`/projects`):** Multi-dimensional filtering by category (*Highways & Bridges, Urban & Transit, Industrial & Energy, Commercial Infrastructure, Water & Utilities*) and construction status (*Ongoing, Completed, Planned, On Hold*), text search, and pagination.
* **Project Detail Pages (`/projects/[slug]`):** Dedicated SEO-optimized pages with cover photography, full descriptions, scope of work checklist, technical specifications key-value table, interactive lightbox gallery with keyboard controls (`Esc`, `ArrowLeft`, `ArrowRight`), video embeds (YouTube / Vimeo / Cloudinary), related projects, and dedicated inquiry CTA.
* **Services (`/services`):** Comprehensive civil engineering capabilities across all sectors with technical deliverables.
* **About Us (`/about`):** Corporate mission, zero-harm safety culture, and material integrity verification standards.
* **Contact & Tender Desk (`/contact`):** Interactive inquiry form with client and server-side validation, anti-spam honeypot, and database persistence.
* **Supporting Pages:** Custom 404 (`/_not-found`), error boundary (`/error`), `/privacy`, `/terms`, dynamic `/sitemap.xml`, and `/robots.txt`.

### 2. Protected Administrative CMS (`/admin`)
* **Secure Authentication:** Server-side sessions stored in MongoDB, `HttpOnly` and `SameSite=Lax` cookies, bcrypt password hashing, and session regeneration to prevent fixation.
* **Executive Dashboard (`/admin/dashboard`):** Real-time calculated metrics (total projects, published, drafts, ongoing, completed, new inquiries), recent project updates, recent inquiries, and security audit log.
* **Project Management (`/admin/projects`):** Full CRUD, one-click Publish / Unpublish toggles, Archive / Restore controls, permanent deletion (superadmin only) with confirmation dialogs, and instant on-demand cache revalidation.
* **Project Editor (`/admin/projects/new` & `[id]/edit`):** Structured tabbed form covering Basic Info, Status & Timeline, Scope & Descriptions, Specifications, Media & Gallery with signed Cloudinary direct uploads, Video, and SEO metadata.
* **Inquiry Inbox (`/admin/inquiries`):** Filter by status (*New, In Progress, Responded, Closed*), slide-over detail drawer, live status updates, and private internal notes.
* **User & Security Governance (`/admin/settings`):** Secure password change form and superadmin user provisioning.

---

## Getting Started Locally

### 1. Prerequisites
* **Node.js:** v18+ (tested on Node v22.14.0)
* **npm:** v9+
* **MongoDB:** Local MongoDB daemon (`mongodb://127.0.0.1:27017`) or MongoDB Atlas. (In development/test, an automatic in-memory fallback is also supported).

### 2. Environment Setup
Copy the example environment template:
```bash
cp .env.example .env
```
Default local values work out of the box for development.

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed Database
Seed the initial superadmin account and the 6 demonstration infrastructure projects:
```bash
npm run seed:admin
npm run seed:demo
```
* **Default Superadmin:** `admin@nivarainfra.com`
* **Default Password:** `NivaraAdmin2026!`

### 5. Start Development Servers
Start both the Express backend and Next.js frontend concurrently:
```bash
npm run dev
```
* **Public Corporate Website:** [http://localhost:3000](http://localhost:3000)
* **Admin CMS Portal:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
* **Express REST API:** [http://localhost:5000/api/v1](http://localhost:5000/api/v1)
* **API Health Check:** [http://localhost:5000/health](http://localhost:5000/health)

---

## Required npm Scripts

All scripts can be run directly from the repository root:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs both backend API and Next.js frontend concurrently |
| `npm run dev:web` | Runs the Next.js development server (`http://localhost:3000`) |
| `npm run dev:api` | Runs the Express API backend with watch mode (`http://localhost:5000`) |
| `npm run build` | Compiles the Next.js production build and checks all routes |
| `npm run lint` | Runs automated ESLint checks across workspaces |
| `npm run test` | Executes backend Vitest/Supertest integration suite (23 tests) and web unit tests |
| `npm run test:e2e` | Runs Playwright browser end-to-end tests (headless Chromium) |
| `npm run seed:demo` | Idempotently populates the 6 demonstration project archetypes |
| `npm run seed:admin` | Provisions or updates the initial superadmin user safely |

---

## Security & Verification Summary

* **Public vs Draft Isolation:** Public endpoints (`/api/v1/projects`) strictly enforce `publicationStatus = "Published"` and `archiveStatus = "Active"`. Draft and archived projects are never exposed to anonymous users.
* **Bounded Proxy:** Browser requests to the API pass through Next.js route handler proxy `/api/proxy/[...path]`, enforcing path allowlists, upstream timeouts, and rejecting path traversal (`..`).
* **Direct Signed Uploads:** Browser uploads to Cloudinary are authorized via server-generated signatures (`/api/v1/admin/media/sign`). The Cloudinary API secret is never sent to the browser.
* **Audit Logging:** Sensitive administrative actions are recorded in MongoDB with timestamp, user ID, user email, action, and IP.
