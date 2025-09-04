# Notes Frontend (Next.js)

Modern, minimalistic notes application UI with:
- User authentication
- Create, read, update, delete notes
- Search and filter by tags
- Tagging notes
- Responsive sidebar layout
- Light theme using palette:
  - Primary: #0070f3
  - Secondary: #1a202c
  - Accent: #f59e42

## Running locally

1) Install deps
   npm install

2) (Optional) Configure backend URL
   Copy .env.example to .env and set:
     NEXT_PUBLIC_BACKEND_API_URL=https://your-backend.example.com

If NEXT_PUBLIC_BACKEND_API_URL is not set, the app uses an in-memory fallback store to allow local demo (no persistence).

3) Start dev server
   npm run dev
   Open http://localhost:3000

## Structure

- src/app
  - page.tsx (redirect logic)
  - auth/page.tsx (login/register)
  - notes/page.tsx (protected app)
- src/components (UI components and layout pieces)
- src/context/AuthContext.tsx (auth state)
- src/lib/api.ts (API client; uses in-memory fallback)

## Backend integration

- Set NEXT_PUBLIC_BACKEND_API_URL to point to your backend.
- Expected endpoints (illustrative, to be implemented on backend):
  - POST /auth/login {email, password} -> {id, email, token}
  - POST /auth/register {email, password} -> {id, email, token}
  - POST /auth/logout
  - GET /notes -> Note[]
  - POST /notes -> Note
  - PUT /notes/:id -> Note
  - DELETE /notes/:id

Attach Bearer token in Authorization header if using token auth.

## Keyboard shortcuts

- Ctrl/Cmd + S: Save note

## Accessibility

- Buttons and inputs include labels and aria attributes where relevant.
