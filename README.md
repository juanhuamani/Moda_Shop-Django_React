# Moda Shop

Spanish-language online fashion store: a React single-page client talking to a Django REST
Framework API. An active product in development, not a finished release. Shoppers browse a
catalog, manage a cart, and edit their profile; a staff back office maintains categories,
products, and carts.

Business context: `docs/CONTEXT.md`. Technical detail: `docs/ARCHITECTURE.md`.
Deployment: `docs/DEPLOY.md`. File map: `docs/CODEMAP.md`. Backend notes:
`server-django/README.md`.

## Stack

| Layer | Versions |
|---|---|
| Client | React 19, TypeScript 5.7, Vite 6, Tailwind CSS 4, React Router 7 |
| Server | Django 5.2, Django REST Framework 3.16, SimpleJWT |
| Database | SQLite (`server-django/core/db.sqlite3`) |

## Layout

```
client/                 React SPA (package.json, vite.config.ts, src/)
server-django/          Django workspace folder
server-django/core/     Django project: manage.py, requirements.txt, settings, urls
docs/                   Workspace docs: CONTEXT, ARCHITECTURE, CODEMAP, TODO, ASSUMPTIONS
```

## Prerequisites

- Python 3.11 or newer.
- Node.js 20 or newer with npm.

## Client setup

```bash
cd client
npm install
cp .env.example .env      # both values empty = same-origin mode, the supported setup
```

`client/.env.example` documents the two variables. `VITE_API_URL` and `VITE_MEDIA_URL`
are empty by default: the browser calls `/api/...` and `/auth/...` on its own origin,
which the Vite dev server proxies to `127.0.0.1:8000`. Set one only for an absolute
`http(s)` URL (for example a remote backend during development); a malformed value stops
the app at startup. Do not leave a hardcoded `http://localhost:8000` in the file - that
breaks the single-origin cookie setup.

Run the dev server: `npm run dev`. Production build: `npm run build` (type-check plus Vite
build). `npm run lint` runs ESLint.

## Server setup

All commands run from `server-django/core` (that folder holds `manage.py` and
`requirements.txt`).

```bash
cd server-django/core
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Linux/macOS
pip install -r requirements.txt
```

`requirements.txt` lists every runtime dependency, including `django-environ`,
`whitenoise` and `gunicorn`; `pip install -r requirements.txt` is sufficient.

Create `server-django/core/.env` from the tracked example and generate a secret:

```bash
cp .env.example .env
python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `SECRET_KEY` | yes | none | Django secret key; startup fails without it |
| `DEBUG` | no | `False` | Debug mode; `0` in production |
| `ALLOWED_HOSTS` | yes when `DEBUG=0` | `localhost,127.0.0.1` when `DEBUG=1` | Comma-separated host list |
| `DATABASE_TIMEOUT` | no | `20` | SQLite busy timeout in seconds |
| `CORS_ALLOWED_ORIGINS` | no | `[]` | Only for a cross-origin setup; single origin needs none |
| `CSRF_TRUSTED_ORIGINS` | no | `[]` | Full `scheme://host` origins trusted by the Origin guard |
| `ACCESS_TOKEN_LIFETIME` | no | `30` | Access token lifetime in minutes |
| `REFRESH_TOKEN_LIFETIME` | no | `1` | Refresh token lifetime in days |
| `JWT_COOKIE_SECURE` | no | `not DEBUG` | `Secure` flag on the auth cookies |
| `JWT_COOKIE_SAMESITE` | no | `Lax` | `SameSite` flag on the auth cookies |
| `CSRF_COOKIE_SECURE` | no | `not DEBUG` | `Secure` flag on the CSRF cookie |
| `MEDIA_ROOT` | no | `server-django/core/media` | Uploaded media location |
| `USE_X_FORWARDED_HOST` / `USE_X_FORWARDED_PROTO` | no | `False` | Behind a reverse proxy |

Production values, SQLite rules and per-host steps: `docs/DEPLOY.md`.

Then:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
python manage.py runserver
```

The API is served at `http://localhost:8000` with roots `/auth/`, `/api/`, and `/admin/`.
Authentication travels in httpOnly cookies, so the SPA and the API must share one origin.

## Tests

None yet. `apps/account/tests.py` and `apps/shop/tests.py` are empty stubs; the client has
no test runner. `python manage.py test` runs an empty suite.

## Known gaps

- Checkout, payment, order history, shipping, and a real discount engine are not implemented.
- No automated tests and no CI: the four gates (`manage.py check`,
  `makemigrations --check`, `npm run build`, `npm run lint`) and the deploy smoke checklist
  run by hand.
- SQLite in production means a single gunicorn worker (`--workers 1`); no horizontal
  scaling. See `docs/DEPLOY.md`.
- Known client limitation: two tabs sharing one session can race on refresh-token rotation,
  and the slower tab is logged out.

Priorities: `docs/TODO.md`. Open unknowns: `docs/ASSUMPTIONS.md`.
