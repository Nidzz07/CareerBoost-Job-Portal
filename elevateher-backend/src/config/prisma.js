// Single shared Prisma Client instance used across the app.
// Prevents creating multiple DB connection pools during development (with nodemon reloads).

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

module.exports = prisma;
