"use strict";

// Unit tests for the pure helpers in the ML service wrapper. These exercise the
// candidate-building and ranking logic the whole app relies on, without touching the
// network. Run with: npm test  (Node's built-in test runner, no extra deps).
const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildProductCandidate,
  buildJobCandidate,
  buildCourseCandidate,
  buildUserProfileText,
  orderByMlIds,
} = require("../src/services/ml.service");

test("buildProductCandidate compacts fields into id + text", () => {
  const c = buildProductCandidate({
    id: "p1",
    name: "Hand-block saree",
    category: "Textiles",
    description: "Cotton",
    seller: { location: "Jaipur" },
  });
  assert.equal(c.id, "p1");
  assert.match(c.text, /Textiles/);
  assert.match(c.text, /Hand-block saree/);
  assert.match(c.text, /Jaipur/);
});

test("buildJobCandidate and buildCourseCandidate skip empty fields", () => {
  const job = buildJobCandidate({ id: "j1", title: "Designer", category: "Design", description: "", location: null });
  assert.equal(job.id, "j1");
  assert.match(job.text, /Design/);
  assert.doesNotMatch(job.text, /null/);

  const course = buildCourseCandidate({ id: "c1", title: "UX", category: "Design", level: undefined, description: "" });
  assert.equal(course.id, "c1");
  assert.match(course.text, /UX/);
});

test("orderByMlIds reorders items by ranked ids and appends the rest", () => {
  const items = [{ id: "a" }, { id: "b" }, { id: "c" }];
  const ranked = orderByMlIds(items, ["c", "a"]);
  assert.deepEqual(ranked.map((i) => i.id), ["c", "a", "b"]);
});

test("orderByMlIds returns items unchanged when ranking is empty", () => {
  const items = [{ id: "a" }, { id: "b" }];
  assert.deepEqual(orderByMlIds(items, []), items);
  assert.deepEqual(orderByMlIds(items, null), items);
});

test("orderByMlIds ignores unknown ids in the ranking", () => {
  const items = [{ id: "a" }, { id: "b" }];
  const ranked = orderByMlIds(items, ["zzz", "b"]);
  assert.deepEqual(ranked.map((i) => i.id), ["b", "a"]);
});

test("buildUserProfileText merges resume skills and completed courses", () => {
  const text = buildUserProfileText({
    user: { location: "Pune", language: "hi" },
    resume: { bio: "Weaver", skillsJson: JSON.stringify(["Embroidery", "Stitching"]) },
    enrollments: [{ progress: 100, course: { title: "Tailoring", category: "Craft" } }],
  });
  assert.match(text, /Weaver/);
  assert.match(text, /Embroidery/);
  assert.match(text, /Tailoring/);
});
