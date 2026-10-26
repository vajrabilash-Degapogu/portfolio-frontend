# Portfolio Admin API

Separate Express API for owner-only content management.

## Requirements
- Node.js 20+
- Persistent writable disk for SQLite and uploads (ephemeral serverless filesystems are unsuitable without managed storage changes).

## Local setup
1. Run `cd backend`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `ADMIN_EMAIL`, a random `JWT_SECRET` of 32+ characters, and SMTP credentials. Use a Google App Password for Gmail.
5. Set `FRONTEND_ORIGIN=http://localhost:3000`.
6. Run `npm run dev`.

Health check: `http://localhost:4000/api/health`.

## Environment variables
`ADMIN_EMAIL` is the only administrator address. `JWT_SECRET` must be long and random. `FRONTEND_ORIGIN` is the exact frontend origin, optionally comma-separated. SMTP uses `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `MAIL_FROM`. Set persistent `DATABASE_PATH` and `UPLOAD_DIR` in production. `NODE_ENV=production` enables secure cookies, so use HTTPS.

## Endpoints
Public: `GET /api/health`, `GET /api/public`, `GET /api/public/changes`.
Authentication: `POST /api/auth/request-otp`, `POST /api/auth/verify-otp`, `GET /api/auth/me`, `POST /api/auth/logout`.
Authenticated admin: `GET /api/admin/projects`; `POST /api/admin/projects`; `PUT /api/admin/projects/:id`; `DELETE /api/admin/projects/:id`; `POST /api/admin/upload/resume`, `/profile`, or `/favicon` (multipart field `file`); `PUT /api/admin/settings`; `GET /api/admin/changes`.

OTPs expire in 5 minutes, are hashed, and have attempt/rate limits. Session cookie is HTTP-only and expires in 8 hours. Uploads are limited to 5 MB, with PDF resumes and image types for images.

## Production notes
- Keep `.env`, SQLite files and uploads out of Git.
- Use HTTPS and persistent storage with backups.
- For serverless platforms, migrate SQLite and local uploads to managed database/object storage.
- Browser title/favicon updates at runtime. Social previews in static HTML can require a redeploy for crawlers that don't execute JavaScript.
