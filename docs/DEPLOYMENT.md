# Nivara Infrastructure — Production Deployment & Operations Guide

This guide details the steps to deploy the **Nivara Infrastructure** full-stack monorepo (`apps/web` and `apps/api`) into production environments.

---

## 1. Architecture Overview

The system consists of two independent services:
1. **Next.js Corporate Web & CMS** (`apps/web`):
   - Handles server-side rendering, SEO, page caching, and the admin UI.
   - Proxies authenticated requests to the backend through the bounded route handler at `/api/proxy/[...path]`.
2. **Express.js API Backend** (`apps/api`):
   - Source of truth for business logic, database transactions, role authorization, and audit logging.
   - Connected to MongoDB Atlas.

```
[Browser / Client] 
        │
        ├──► [Next.js (apps/web)] (Port 3000 / Edge CDN)
        │           │
        │           └──► Internal Proxy: /api/proxy/*
        │                       │
        └───────────────────────┴──► [Express API (apps/api)] (Port 5000)
                                             │
                                             ├──► MongoDB Atlas
                                             └──► Cloudinary CDN
```

---

## 2. Environment Variables Specification

Both services read configuration from their environment variables. Copy `.env.example` to configure:

| Variable | Scope | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Both | Node environment | `production` |
| `PORT` | API | HTTP port for Express | `5000` |
| `MONGODB_URI` | API | MongoDB Atlas connection string with credentials | `mongodb+srv://<user>:<password>@cluster.mongodb.net/nivara_infrastructure` |
| `SESSION_SECRET` | API | High-entropy secret for signing session cookies (min 32 chars) | `6f3a8e9b...` (generate via `crypto.randomBytes(32).toString('hex')`) |
| `ALLOWED_ORIGIN` | API | Allowed frontend origin for CORS and CSRF verification | `https://www.nivarainfra.com` |
| `REVALIDATION_SECRET` | Both | Shared secret for on-demand Next.js cache revalidation | `shared_secret_key_...` |
| `CLOUDINARY_CLOUD_NAME`| Both | Cloudinary account cloud name | `nivara-infra-cloud` |
| `CLOUDINARY_API_KEY` | API | Cloudinary public API key | `123456789012345` |
| `CLOUDINARY_API_SECRET`| API | Cloudinary private API secret (NEVER exposed to frontend) | `abcdefghijklmnopqrstuv_123` |
| `NEXT_PUBLIC_SITE_URL` | Web | Canonical public URL of the website | `https://www.nivarainfra.com` |
| `API_INTERNAL_URL` | Web | Private/internal address to reach Express backend | `http://api-service:5000` or `https://api.nivarainfra.com` |
| `ADMIN_EMAIL` | API | Initial superadmin email for seeding | `admin@nivarainfra.com` |
| `ADMIN_PASSWORD` | API | Initial superadmin password for seeding | `[StrongPassword]` |
| `ADMIN_NAME` | API | Initial superadmin full name | `Nivara Superadmin` |

---

## 3. Database Setup (MongoDB Atlas)

1. Provision a MongoDB Atlas cluster (M0 free tier or dedicated M10+).
2. Create a database user with read/write privileges on the `nivara_infrastructure` database.
3. Configure Atlas Network Access (IP Access List): whitelist your server IP addresses or VPC peering.
4. Verify compound indexes:
   ```javascript
   // Automatically managed by Mongoose on startup:
   Project.index({ publicationStatus: 1, archiveStatus: 1, isFeatured: -1, createdAt: -1 });
   Project.index({ category: 1, publicationStatus: 1, archiveStatus: 1 });
   Project.index({ slug: 1 }, { unique: true });
   ```

---

## 4. Seeding Initial Administrator

Run the idempotent admin seeding script once database connectivity is established:
```bash
npm run seed:admin
```
This reads `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` from the environment, hashes the password with bcrypt (12 rounds), and ensures the user exists with `role: "superadmin"`.

To populate initial demonstration projects:
```bash
npm run seed:demo
```

---

## 5. Deployment Options

### Option A: Paired Node.js Platform (Render, Railway, Fly.io, or VPS)

#### Backend Deployment (`apps/api`):
- **Build Command:** `npm install`
- **Start Command:** `npm run start --workspace=apps/api`
- **Health Check Endpoint:** `GET /health` (returns `200` with database status)

#### Frontend Deployment (`apps/web`):
- **Build Command:** `npm run build --workspace=apps/web`
- **Start Command:** `npm run start --workspace=apps/web`
- Set `API_INTERNAL_URL` to point to the backend service.

---

## 6. Health Checks & Monitoring

- Express API Health Check: `GET /health`
  ```json
  {
    "status": "healthy",
    "service": "Nivara Infrastructure API",
    "uptime": 86400,
    "database": "connected"
  }
  ```
- If the database disconnects, `/health` returns `503 Service Unavailable`.

---

## 7. Security & Rollback Procedures

1. **Cookie Security:** In production (`NODE_ENV=production`), session cookies are marked `HttpOnly`, `Secure`, and `SameSite=Lax`. Ensure SSL/TLS is terminated at your load balancer or reverse proxy (`trust proxy: 1` is configured).
2. **Audit Logging:** Every project creation, edit, publication change, archive, and deletion is recorded in the `AuditLog` collection with timestamp, IP, and administrator ID.
3. **Rollback Strategy:**
   - Previous versions of `apps/web` can be rolled back without database schema conflicts.
   - If a project slug is changed, the revalidation service automatically clears both the old and new URLs.
