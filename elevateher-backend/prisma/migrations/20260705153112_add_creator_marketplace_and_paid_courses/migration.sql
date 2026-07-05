-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'hi',
    "level" TEXT NOT NULL DEFAULT 'BEGINNER',
    "mediaUrl" TEXT,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "mentorId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "price" REAL NOT NULL DEFAULT 0,
    "reviewStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "courses_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_courses" ("category", "createdAt", "description", "duration", "id", "isPublished", "language", "level", "mediaUrl", "mentorId", "title", "updatedAt") SELECT "category", "createdAt", "description", "duration", "id", "isPublished", "language", "level", "mediaUrl", "mentorId", "title", "updatedAt" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
CREATE TABLE "new_enrollments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completedAt" DATETIME,
    "certificateUrl" TEXT,
    "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentStatus" TEXT NOT NULL DEFAULT 'FREE',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    CONSTRAINT "enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_enrollments" ("certificateUrl", "completedAt", "courseId", "enrolledAt", "id", "progress", "userId") SELECT "certificateUrl", "completedAt", "courseId", "enrolledAt", "id", "progress", "userId" FROM "enrollments";
DROP TABLE "enrollments";
ALTER TABLE "new_enrollments" RENAME TO "enrollments";
CREATE UNIQUE INDEX "enrollments_razorpayOrderId_key" ON "enrollments"("razorpayOrderId");
CREATE UNIQUE INDEX "enrollments_userId_courseId_key" ON "enrollments"("userId", "courseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
