# Avion on Hostinger VPS (flightbugs.com)

Target:
- Domain (GoDaddy): `flightbugs.com`
- VPS IP: `2.25.83.90`
- SSH: `ssh root@2.25.83.90`
- Stack port on host: `8080` (does not replace other live sites)

## 1) GoDaddy DNS (point domain to VPS)

In GoDaddy → flightbugs.com → **DNS**:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `2.25.83.90` | 600 |
| A | `www` | `2.25.83.90` | 600 |

Remove conflicting A/AAAA/CNAME records for `@` / `www` that point elsewhere.
Wait for DNS (often 5–30 min).

## 2) Check already-live sites on Hostinger (safe)

```bash
ssh root@2.25.83.90
```

Then on the VPS:

```bash
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"
ss -tulpn | grep -E ':80|:443|:8080|:3000|:3001'
ls -la /var/www 2>/dev/null
ls -la /root 2>/dev/null
nginx -t 2>/dev/null; ls /etc/nginx/sites-enabled 2>/dev/null
caddy version 2>/dev/null
df -h /
free -h
```

Note which ports/sites already use 80/443 so Avion stays on `8080` (or another free port).

## 3) Env files (repo root on VPS)

Copy examples and set real secrets (same `HMAC_SIGNING_SECRET` in root + Frontend + Backend):

```bash
cp .env.example .env
cp Frontend/.env.example Frontend/.env
cp Backend/.env.example Backend/.env
nano .env Frontend/.env Backend/.env
```

Required production values:
- `NEXT_PUBLIC_APP_URL=https://flightbugs.com`
- `ALLOWED_ORIGINS=https://flightbugs.com,https://www.flightbugs.com`
- Strong `POSTGRES_PASSWORD` / `HMAC_SIGNING_SECRET`
- Real `DUFFEL_API_TOKEN`

## 4) Go live (Avion only — does not wipe other sites)

```bash
cd /opt/avion   # or your clone path
docker compose up -d --build
docker compose ps
curl -I http://127.0.0.1:8080/en
```

## 5) Host reverse proxy (80/443 → Avion 8080)

On the VPS, add a vhost for `flightbugs.com` that proxies to `http://127.0.0.1:8080`, then enable HTTPS (Certbot/Caddy). Do **not** overwrite vhosts for the other 3 live sites.

Example Nginx server block:

```nginx
server {
  listen 80;
  server_name flightbugs.com www.flightbugs.com;
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Then:

```bash
certbot --nginx -d flightbugs.com -d www.flightbugs.com
```

## Notes

- Compose publishes only `AVION_HTTP_PORT` (default 8080).
- Postgres/Backend stay on the internal Docker network.
- Take a Hostinger snapshot before first deploy.
