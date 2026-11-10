# server-django

Django 5.2 + Django REST Framework 3.16 API for Moda Shop, with SimpleJWT authentication
and a jazzmin-themed admin. SQLite is the default database.

Project root for commands is `server-django/core/` (the `core` package inside it holds
settings, URLs, WSGI/ASGI).

## Setup (Windows PowerShell)

```powershell
cd server-django\core
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Linux/macOS: `source venv/bin/activate` instead of the activation line above.

`requirements.txt` lists every runtime dependency, including `django-environ`,
`whitenoise` and `gunicorn`; no extra install is needed.

## Configuration

Settings read `server-django/core/.env` through `django-environ`; copy the tracked
`server-django/core/.env.example` and set `SECRET_KEY`
(`python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"`).

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `SECRET_KEY` | yes | none | Django secret key; no default, startup fails without it |
| `DEBUG` | no | `False` | Debug mode; `0` in production (also disables Django media serving) |
| `ALLOWED_HOSTS` | yes when `DEBUG=0` | `localhost,127.0.0.1` when `DEBUG=1` | Comma-separated host list |
| `DATABASE_TIMEOUT` | no | `20` | SQLite busy timeout, seconds |
| `CORS_ALLOWED_ORIGINS` | no | `[]` | Only for a cross-origin setup; single origin needs none |
| `CSRF_TRUSTED_ORIGINS` | no | `[]` | Full `scheme://host` origins trusted by the Origin guard |
| `ACCESS_TOKEN_LIFETIME` | no | `30` | Access token lifetime in minutes |
| `REFRESH_TOKEN_LIFETIME` | no | `1` | Refresh token lifetime in days |
| `JWT_COOKIE_SECURE` | no | `not DEBUG` | `Secure` flag on the auth cookies |
| `JWT_COOKIE_SAMESITE` | no | `Lax` | `SameSite` flag on the auth cookies |
| `CSRF_COOKIE_SECURE` | no | `not DEBUG` | `Secure` flag on the CSRF cookie |
| `MEDIA_ROOT` | no | `server-django/core/media` | Uploaded media location |
| `USE_X_FORWARDED_HOST`, `USE_X_FORWARDED_PROTO` | no | `False` | Behind a reverse proxy |

Every key, with its production value, is in `docs/DEPLOY.md` §2.1.

## Apps

- `apps/account` - custom user model (`AUTH_USER_MODEL = account.User`), JWT auth,
  profile, password change, admin registration.
- `apps/shop` - `Category`, `Product`, `Cart`, `CartItem`; API views; domain services in
  `apps/shop/services/`; admin registration with slug prepopulation.

## Endpoints

Auth root `/auth/`:

| Method | Path | Auth |
|---|---|---|
| POST | `/auth/register` | public, throttled 5/hour |
| POST | `/auth/login` | public, throttled 10/min; sets both cookies |
| POST | `/auth/logout` | public by design, always 200, clears cookies |
| POST | `/auth/refresh` | public, cookie-only, rotates and blacklists the old token |
| GET | `/auth/session` | required (204 / 401) |
| GET | `/auth/profile` | required |
| PUT | `/auth/profile/update` | required |
| PUT | `/auth/profile/avatar` | required, multipart |
| PUT | `/auth/password/change` | required |

Shop root `/api/`:

| Method | Path | Auth |
|---|---|---|
| GET | `/api/products` | required |
| POST | `/api/products` | staff |
| GET | `/api/products/<slug>` | required |
| PUT/DELETE | `/api/products/<slug>` | staff |
| GET | `/api/products/featured` | required |
| GET | `/api/products/popular` | required |
| GET | `/api/categories` | required |
| GET | `/api/categories/<slug>` | required |
| GET | `/api/cart` | required, always 200 |
| POST/PUT | `/api/cartItem/` | required |
| DELETE | `/api/cartItem/<item_id>/` | required |
| DELETE | `/api/cart/clear/` | required, idempotent 204 |

Admin: `/admin/` (jazzmin).

Login sets `access_token` (`Path=/`) and `refresh_token` (`Path=/auth`) as httpOnly
cookies and returns the user object. No token is returned in the body and no
`Authorization` header is accepted. Cookie-authenticated writes under `/api/` and `/auth/`
must carry a trusted `Origin`/`Referer` (`core/middleware.py`).

Static files are served by whitenoise under `/static/`; media files are served by Django
only when `DEBUG=1` and by the reverse proxy in production - see `docs/DEPLOY.md`.

## Tests

`apps/account/tests.py` and `apps/shop/tests.py` are empty stubs. Run with:

```powershell
python manage.py test
```

## Related docs

- `docs/ARCHITECTURE.md` - modules, data model, auth flow, commands.
- `docs/DEPLOY.md` - runtime contract, SQLite rules, per-host steps.
- `docs/ASSUMPTIONS.md` - known drift and unresolved intent.
- `docs/TODO.md` - prioritized fixes.
