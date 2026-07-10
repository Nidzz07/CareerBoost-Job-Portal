"use strict";

// Unit tests for the auth guard middleware — the core of RBAC enforcement.
const test = require("node:test");
const assert = require("node:assert/strict");

const { requireAuth, requireRole } = require("../src/middleware/auth.middleware");

// Minimal Express res mock capturing status + json payload.
function mockRes() {
  return {
    statusCode: 0,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

test("requireAuth rejects a request with no Authorization header", () => {
  const res = mockRes();
  let nextCalled = false;
  requireAuth({ headers: {} }, res, () => (nextCalled = true));
  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.success, false);
});

test("requireAuth rejects a malformed Authorization header", () => {
  const res = mockRes();
  let nextCalled = false;
  requireAuth({ headers: { authorization: "Token abc" } }, res, () => (nextCalled = true));
  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
});

test("requireRole allows a user whose role is in the allowlist", () => {
  const res = mockRes();
  let nextCalled = false;
  requireRole("SELLER", "ADMIN")({ user: { id: "u1", role: "ADMIN" } }, res, () => (nextCalled = true));
  assert.equal(nextCalled, true);
  assert.equal(res.statusCode, 0);
});

test("requireRole blocks a user whose role is not allowed (403)", () => {
  const res = mockRes();
  let nextCalled = false;
  requireRole("ADMIN")({ user: { id: "u1", role: "LEARNER" } }, res, () => (nextCalled = true));
  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 403);
});

test("requireRole rejects an unauthenticated request (401)", () => {
  const res = mockRes();
  requireRole("ADMIN")({}, res, () => {});
  assert.equal(res.statusCode, 401);
});
