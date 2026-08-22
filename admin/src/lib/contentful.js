// lib/contentful.js — Contentful clients + environment guard for the admin
// portal. Localhost-only; no auth layer because the app never leaves the box.
//
// Token layout (see .env.example):
//   CONTENTFUL_ACCESS_TOKEN  — delivery token, read-only (always present)
//   CONTENTFUL_PAT           — management token for WRITES (optional at read
//                              time; required for write endpoints)
//   CONTENTFUL_ENV           — target environment, allow-listed below.

const { createClient } = require('contentful');
const {
  createClient: createManagementClient,
} = require('contentful-management');

const ENV_ALLOWLIST = ['master', 'develop'];

function resolveEnv() {
  const env = process.env.CONTENTFUL_ENV || 'master';
  if (!ENV_ALLOWLIST.includes(env)) {
    throw new Error(
      `CONTENTFUL_ENV="${env}" is not allowed. Allowed values: ${ENV_ALLOWLIST.join(', ')}.`
    );
  }
  return env;
}

function spaceId() {
  const id = process.env.CONTENTFUL_SPACE_ID;
  if (!id) {
    throw new Error(
      'CONTENTFUL_SPACE_ID is not set. Copy admin/.env.example to admin/.env.'
    );
  }
  return id;
}

/**
 * Delivery client (READS). Works with the read-only delivery token.
 */
function deliveryClient() {
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      'CONTENTFUL_ACCESS_TOKEN is not set. Copy admin/.env.example to admin/.env.'
    );
  }
  // The delivery client has no environment option: it reads the environment
  // the space's delivery API serves (master) by default. For explicit
  // environment reads we use the management client's getEntries when a PAT
  // is available; reads via the delivery client are the established pattern
  // in the main site (src/contentClient.js) and always target master.
  return createClient({
    space: spaceId(),
    accessToken: token,
  });
}

/**
 * Management client (WRITES). Uses the PAT when present; falls back to the
 * delivery token so a read-only portal still boots — but write operations
 * with a delivery-only token fail with a clear 401 surfaced by the API
 * routes.
 */
function managementClient() {
  const token =
    process.env.CONTENTFUL_PAT || process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      'No Contentful token configured. Set CONTENTFUL_ACCESS_TOKEN (reads) and CONTENTFUL_PAT (writes).'
    );
  }
  // contentful-management v12.x "new" API: accessors are objects
  // (client.space.get, client.environment.get) — NOT getSpace().
  return createManagementClient({
    space: spaceId(),
    accessToken: token,
  });
}

/**
 * Whether the configured write token is likely management-capable.
 * Heuristic only — the definitive check is the 401 from the write call.
 */
function hasPat() {
  return Boolean(process.env.CONTENTFUL_PAT);
}

module.exports = {
  ENV_ALLOWLIST,
  resolveEnv,
  spaceId,
  deliveryClient,
  managementClient,
  hasPat,
};
