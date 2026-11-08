/** @type {import('next').NextConfig} */
// Localhost-only, dev-only app. No output: 'export' — the admin portal is
// never built for deployment. The root site (../) is the deployable app.
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
