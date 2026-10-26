# Vajrabilash Degapogu — Portfolio

React portfolio with a separate Express API for owner-only content management. The public portfolio reads projects, resume, profile image, favicon and title from the API, with existing local assets as fallbacks.

## Backend setup
See [backend/README.md](backend/README.md).
1. Deploy `backend` as a Node.js service with persistent storage.
2. Set backend environment variables based on `backend/.env.example`: `ADMIN_EMAIL`, strong `JWT_SECRET`, SMTP credentials, exact `FRONTEND_ORIGIN`, and persistent `DATABASE_PATH`/`UPLOAD_DIR`.
3. Set frontend hosting variable `REACT_APP_API_URL` to the backend origin (e.g. `https://api.yourdomain.com`) and rebuild/redeploy.
4. Visit `/admin` and sign in using email OTP.

Features: OTP login; project CRUD; resume/profile/favicon uploads; site title/description settings; edit history. Never commit secrets, database files, or uploads. Use HTTPS and persistent storage. Serverless hosts need managed database/object storage. Browser title/favicon update at runtime; social preview metadata may require redeployment.
