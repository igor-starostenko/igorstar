/** @type {import('next').NextConfig} */
// Localhost-only, dev-only app. No output: 'export' — the admin portal is
// never built for deployment. The root site (../) is the deployable app.

// Contentful credentials are shared with the main site, so the root .env is
// used as a fallback layer — but only for CONTENTFUL_* keys, so unrelated
// root variables (ANTHROPIC_*, git identity, ...) don't leak into the admin
// process. Precedence: real environment variables > admin/.env > root .env.
// Files are parsed (not config()'d) so precedence is explicit and real env
// vars are never clobbered. admin/.env may not exist yet on a fresh clone —
// that's fine, it becomes PAT-only.
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const merged = {};
for (const file of [path.join(__dirname, '..', '.env'), path.join(__dirname, '.env')]) {
  if (!fs.existsSync(file)) continue;
  for (const [key, value] of Object.entries(dotenv.parse(fs.readFileSync(file, 'utf8')))) {
    if (key.startsWith('CONTENTFUL_')) merged[key] = value;
  }
}
for (const [key, value] of Object.entries(merged)) {
  if (!(key in process.env)) process.env[key] = value;
}

const nextConfig = {
  reactStrictMode: true,
  // This project has its own yarn.lock (it is not part of the root workspace).
  // Pin the Turbopack root here so dev-server root inference doesn't wander
  // up to ../yarn.lock and warn about "multiple lockfiles".
  turbopack: { root: __dirname },
  // Next 16 blocks dev resources (HMR/RSC websocket) for origins not listed
  // here — clients hitting the portal via 127.0.0.1/localhost need this or
  // client components never hydrate (pages stay on their "Loading…" state).
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

module.exports = nextConfig;
