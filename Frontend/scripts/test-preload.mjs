process.env.NODE_ENV ??= "test";
process.env.NEXT_PUBLIC_APP_URL ??= "http://127.0.0.1:3000";
process.env.BACKEND_URL ??= "http://127.0.0.1:3001";
process.env.HMAC_SIGNING_SECRET ??=
  "ci-hmac-signing-secret-at-least-32-chars";
