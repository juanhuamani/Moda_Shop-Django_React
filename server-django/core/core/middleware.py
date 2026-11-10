"""Origin/Referer guard for cookie-authenticated unsafe requests.

DRF ``APIView`` is CSRF-exempt, so ``CsrfViewMiddleware`` does not protect the
API. Both tokens live in cookies, therefore every unsafe request under ``/api/``
or ``/auth/`` must come from an origin we trust, or from no origin at all
(fail-closed).
"""

from urllib.parse import urlsplit

from django.conf import settings
from django.http import JsonResponse

UNSAFE_METHODS = frozenset({'POST', 'PUT', 'PATCH', 'DELETE'})
GUARDED_PREFIXES = ('/api/', '/auth/')


def _origin_of(value):
    """Return ``scheme://netloc`` for a header value, or ``None`` if unusable."""
    if not value:
        return None
    parts = urlsplit(value.strip())
    if not parts.scheme or not parts.netloc:
        # ``Origin: null`` and malformed values land here.
        return None
    return f'{parts.scheme}://{parts.netloc}'.lower()


class OriginGuardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if self._rejects(request):
            return JsonResponse(
                {'detail': 'CSRF origin check failed', 'code': 'origin_rejected'},
                status=403,
            )
        return self.get_response(request)

    def _rejects(self, request):
        if request.method not in UNSAFE_METHODS:
            return False
        if not request.path.startswith(GUARDED_PREFIXES):
            return False

        origin = _origin_of(request.META.get('HTTP_ORIGIN'))
        if origin is None:
            # Fall back to Referer, reduced to its scheme://netloc.
            origin = _origin_of(request.META.get('HTTP_REFERER'))
        if origin is None:
            return True

        if urlsplit(origin).netloc == request.get_host().lower():
            return False

        trusted_origins = {
            str(entry).lower() for entry in getattr(settings, 'CSRF_TRUSTED_ORIGINS', [])
        }
        return origin not in trusted_origins
