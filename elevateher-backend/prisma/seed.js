/* eslint-disable no-console */
/**
 * ElevateHer — Prisma seed.
 *
 * Populates every major module with realistic, referentially-consistent demo data.
 *
 * Idempotent by design: every row is written with a stable, deterministic identifier
 * (either an explicit `id` or a natural unique key) via `upsert`, so running
 * `npx prisma db seed` repeatedly updates rows in place instead of creating duplicates.
 *
 * Password hashing matches the backend exactly: bcryptjs with 10 salt rounds
 * (see src/controllers/auth.controller.js — SALT_ROUNDS = 10).
 *
 * Login for the seeded learner:  test@test.com  /  Password123!
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;
const SEED_PASSWORD = "Password123!";

const NOW = new Date();
const daysAgo = (d) => new Date(NOW.getTime() - d * 86400000);
const daysFromNow = (d) => new Date(NOW.getTime() + d * 86400000);

async function main() {
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, SALT_ROUNDS);

  // ─────────────────────────────────────────────────────────────────────────
  // USERS
  // ─────────────────────────────────────────────────────────────────────────

  // Test learner — reuse the existing account if test@test.com already exists.
  let testUser = await prisma.user.findUnique({ where: { email: "test@test.com" } });
  if (!testUser) {
    testUser = await prisma.user.create({
      data: {
        id: "seed-user-test",
        name: "Test User",
        email: "test@test.com",
        phone: "9876543210",
        passwordHash,
        role: "LEARNER",
        language: "en",
        location: "Mumbai, Maharashtra",
        onboarded: true,
        verified: true,
      },
    });
    console.log("Created test learner test@test.com");
  } else {
    console.log("Reusing existing user test@test.com");
  }
  const testUserId = testUser.id;

  // Fixed-id supporting users (employers, sellers, mentors). Upsert by id.
  const SUPPORTING_USERS = [
    { id: "seed-emp-1", name: "Anita Sharma (TATA Digital)", email: "employer1@elevateher.test", phone: "9000000001", role: "EMPLOYER", location: "Mumbai", employerVerified: true },
    { id: "seed-emp-2", name: "Rahul Verma (Meesho)", email: "employer2@elevateher.test", phone: "9000000002", role: "EMPLOYER", location: "Bengaluru", employerVerified: true },
    { id: "seed-sel-1", name: "Meena Crafts", email: "seller1@elevateher.test", phone: "9000000011", role: "SELLER", location: "Jaipur" },
    { id: "seed-sel-2", name: "Rohini Handmade", email: "seller2@elevateher.test", phone: "9000000012", role: "SELLER", location: "Pune" },
    { id: "seed-men-1", name: "Sunita Devi (Mentor)", email: "mentor1@elevateher.test", phone: "9000000021", role: "LEARNER", location: "Lucknow" },
    { id: "seed-men-2", name: "Priya Nair (Mentor)", email: "mentor2@elevateher.test", phone: "9000000022", role: "LEARNER", location: "Kochi" },
  ];

  for (const u of SUPPORTING_USERS) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {
        name: u.name, email: u.email, phone: u.phone, role: u.role,
        location: u.location, onboarded: true, verified: true,
        employerVerified: u.employerVerified ?? false,
      },
      create: {
        id: u.id, name: u.name, email: u.email, phone: u.phone, passwordHash,
        role: u.role, language: "en", location: u.location, onboarded: true,
        verified: true, employerVerified: u.employerVerified ?? false,
      },
    });
  }
  const mentorId = { 1: "seed-men-1", 2: "seed-men-2" };
  const employerId = { 1: "seed-emp-1", 2: "seed-emp-2" };
  const sellerId = { 1: "seed-sel-1", 2: "seed-sel-2" };
  console.log(`Upserted ${SUPPORTING_USERS.length} supporting users`);

  // ─────────────────────────────────────────────────────────────────────────
  // RESUME (Test User)
  // ─────────────────────────────────────────────────────────────────────────
  await prisma.resume.upsert({
    where: { userId: testUserId },
    update: {},
    create: {
      userId: testUserId,
      bio: "Aspiring fashion designer and craftswoman. I love tailoring, embroidery and building small businesses. Looking for part-time design and content work while I grow my handmade brand.",
      skillsJson: JSON.stringify(["Tailoring", "Embroidery", "Content Writing", "Digital Literacy", "Customer Service"]),
      experienceJson: JSON.stringify([
        { title: "Freelance Tailor", company: "Self-employed", startDate: "2022", endDate: "Present", description: "Stitched 200+ custom garments for local customers." },
        { title: "Community Volunteer", company: "Local NGO", startDate: "2021", endDate: "2022", description: "Ran weekly digital-literacy workshops for women." },
      ]),
      educationJson: JSON.stringify([
        { institution: "SNDT Women's University", degree: "Diploma in Fashion Design", year: "2021" },
      ]),
      portfolioLinksJson: JSON.stringify(["https://instagram.com/testuser.crafts"]),
    },
  });
  console.log("Upserted resume for Test User");

  // ─────────────────────────────────────────────────────────────────────────
  // COURSES + LESSONS + QUIZZES
  // ─────────────────────────────────────────────────────────────────────────
  const COURSES = [
    { num: 1, category: "Tailoring", title: "Tailoring & Stitching Basics", level: "BEGINNER", language: "hi", price: 0, mentor: 1, duration: 6, lessons: 4, quiz: true },
    { num: 2, category: "Cooking", title: "Everyday Cooking for Small Businesses", level: "BEGINNER", language: "hi", price: 0, mentor: 2, duration: 5, lessons: 5, quiz: true },
    { num: 3, category: "Digital Literacy", title: "Digital Literacy: Smartphone to Success", level: "BEGINNER", language: "en", price: 0, mentor: 1, duration: 4, lessons: 3, quiz: true },
    { num: 4, category: "Beauty & Wellness", title: "Beauty & Wellness Entrepreneurship", level: "INTERMEDIATE", language: "hi", price: 499, mentor: 2, duration: 8, lessons: 4, quiz: false },
    { num: 5, category: "Handicrafts", title: "Handicrafts & Home Decor", level: "BEGINNER", language: "mr", price: 0, mentor: 1, duration: 6, lessons: 5, quiz: true },
    { num: 6, category: "Financial Literacy", title: "Financial Literacy for Women", level: "BEGINNER", language: "hi", price: 0, mentor: 2, duration: 5, lessons: 4, quiz: false },
    { num: 7, category: "Spoken English", title: "Spoken English Confidence", level: "INTERMEDIATE", language: "en", price: 299, mentor: 1, duration: 10, lessons: 5, quiz: true },
    { num: 8, category: "Entrepreneurship", title: "Start Your Own Business", level: "ADVANCED", language: "hi", price: 799, mentor: 2, duration: 12, lessons: 4, quiz: false },
    { num: 9, category: "Agriculture", title: "Organic Farming Essentials", level: "BEGINNER", language: "mr", price: 0, mentor: 1, duration: 7, lessons: 3, quiz: false },
    { num: 10, category: "Graphic Design", title: "Intro to Graphic Design", level: "INTERMEDIATE", language: "en", price: 599, mentor: 2, duration: 9, lessons: 5, quiz: true },
  ];

  const courseLessonIds = {};
  for (const c of COURSES) {
    const courseId = `seed-course-${c.num}`;
    await prisma.course.upsert({
      where: { id: courseId },
      update: {
        title: c.title, description: `A practical, beginner-friendly ${c.category.toLowerCase()} course with hands-on lessons.`,
        category: c.category, language: c.language, level: c.level, duration: c.duration,
        price: c.price, isPublished: true, reviewStatus: "APPROVED", mentorId: mentorId[c.mentor],
      },
      create: {
        id: courseId, title: c.title, description: `A practical, beginner-friendly ${c.category.toLowerCase()} course with hands-on lessons.`,
        category: c.category, language: c.language, level: c.level, duration: c.duration,
        price: c.price, isPublished: true, reviewStatus: "APPROVED", mentorId: mentorId[c.mentor],
      },
    });

    const ids = [];
    for (let n = 1; n <= c.lessons; n++) {
      const lessonId = `seed-lesson-${c.num}-${n}`;
      await prisma.lesson.upsert({
        where: { id: lessonId },
        update: { title: `Lesson ${n}: ${c.category} — Part ${n}`, content: `Lesson ${n} content for ${c.title}.`, order: n - 1 },
        create: {
          id: lessonId, courseId, title: `Lesson ${n}: ${c.category} — Part ${n}`,
          content: `Lesson ${n} content for ${c.title}.`, videoUrl: null, order: n - 1,
        },
      });
      ids.push(lessonId);
    }
    courseLessonIds[courseId] = ids;

    if (c.quiz) {
      const quizId = `seed-quiz-${c.num}`;
      await prisma.quiz.upsert({
        where: { id: quizId },
        update: { title: `${c.title} — Final Quiz`, passingScore: 70 },
        create: { id: quizId, courseId, title: `${c.title} — Final Quiz`, passingScore: 70 },
      });
      const questions = [
        { q: `What is the first step covered in "${c.title}"?`, options: ["Preparation", "Skip it", "Random guess", "None"], correct: 0 },
        { q: `Which is a good practice in ${c.category}?`, options: ["Ignore safety", "Follow the steps", "Rush", "Give up"], correct: 1 },
        { q: `How do you improve at ${c.category}?`, options: ["Never practice", "Practice regularly", "Avoid feedback", "Quit"], correct: 1 },
      ];
      for (let qi = 0; qi < questions.length; qi++) {
        const questionId = `seed-question-${c.num}-${qi + 1}`;
        await prisma.question.upsert({
          where: { id: questionId },
          update: { questionText: questions[qi].q, optionsJson: JSON.stringify(questions[qi].options), correctOptionIndex: questions[qi].correct },
          create: {
            id: questionId, quizId, questionText: questions[qi].q,
            optionsJson: JSON.stringify(questions[qi].options), correctOptionIndex: questions[qi].correct,
          },
        });
      }
    }
  }
  console.log(`Upserted ${COURSES.length} published courses with lessons and quizzes`);

  // ─────────────────────────────────────────────────────────────────────────
  // ENROLLMENTS (Test User): 1 completed, 1 @60%, 1 @15%
  // ─────────────────────────────────────────────────────────────────────────
  const enrollments = [
    { courseId: "seed-course-1", progress: 100 },
    { courseId: "seed-course-2", progress: 60 },
    { courseId: "seed-course-3", progress: 15 },
  ];
  for (const e of enrollments) {
    const all = courseLessonIds[e.courseId] || [];
    const doneCount = Math.round((e.progress / 100) * all.length);
    const completedLessons = all.slice(0, doneCount);
    const completed = e.progress >= 100;
    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: testUserId, courseId: e.courseId } },
      update: {
        progress: e.progress,
        completedLessonsJson: JSON.stringify(completedLessons),
        completedAt: completed ? daysAgo(5) : null,
        certificateUrl: completed ? `/certificates/${e.courseId}-${testUserId}.pdf` : null,
        lastActivityAt: daysAgo(e.progress >= 100 ? 5 : 2),
        paymentStatus: "FREE",
      },
      create: {
        userId: testUserId, courseId: e.courseId, progress: e.progress,
        completedLessonsJson: JSON.stringify(completedLessons),
        completedAt: completed ? daysAgo(5) : null,
        certificateUrl: completed ? `/certificates/${e.courseId}-${testUserId}.pdf` : null,
        enrolledAt: daysAgo(30), lastActivityAt: daysAgo(e.progress >= 100 ? 5 : 2),
        paymentStatus: "FREE",
      },
    });
  }
  console.log("Upserted 3 enrollments for Test User (100% / 60% / 15%)");

  // ─────────────────────────────────────────────────────────────────────────
  // JOBS
  // ─────────────────────────────────────────────────────────────────────────
  const JOBS = [
    { num: 1, title: "Junior Fashion Designer", category: "Design", jobType: "FULL_TIME", location: "Mumbai", salaryMin: 20000, salaryMax: 35000, employer: 1 },
    { num: 2, title: "Content Writer (Part-time)", category: "Writing", jobType: "PART_TIME", location: "Remote", salaryMin: 12000, salaryMax: 20000, employer: 2 },
    { num: 3, title: "Kitchen Assistant", category: "Culinary", jobType: "FULL_TIME", location: "Pune", salaryMin: 15000, salaryMax: 22000, employer: 1 },
    { num: 4, title: "Customer Support Executive", category: "Support", jobType: "FULL_TIME", location: "Bengaluru", salaryMin: 18000, salaryMax: 28000, employer: 2 },
    { num: 5, title: "Beauty Consultant", category: "Beauty", jobType: "CONTRACT", location: "Delhi", salaryMin: 16000, salaryMax: 30000, employer: 1 },
    { num: 6, title: "Handicraft Sales Associate", category: "Retail", jobType: "GIG", location: "Jaipur", salaryMin: 10000, salaryMax: 18000, employer: 2 },
    { num: 7, title: "Accounts Assistant", category: "Finance", jobType: "FULL_TIME", location: "Ahmedabad", salaryMin: 20000, salaryMax: 32000, employer: 1 },
    { num: 8, title: "Primary School Tutor", category: "Teaching", jobType: "PART_TIME", location: "Lucknow", salaryMin: 12000, salaryMax: 18000, employer: 2 },
    { num: 9, title: "Farm Operations Helper", category: "Agriculture", jobType: "CONTRACT", location: "Nashik", salaryMin: 11000, salaryMax: 17000, employer: 1 },
    { num: 10, title: "Social Media Coordinator", category: "Marketing", jobType: "PART_TIME", location: "Remote", salaryMin: 15000, salaryMax: 25000, employer: 2 },
  ];
  for (const j of JOBS) {
    const jobId = `seed-job-${j.num}`;
    await prisma.job.upsert({
      where: { id: jobId },
      update: {
        title: j.title, description: `We're hiring a ${j.title}. Supportive team, flexible hours and growth opportunities for women re-entering the workforce.`,
        category: j.category, location: j.location, jobType: j.jobType, salaryMin: j.salaryMin, salaryMax: j.salaryMax, isActive: true, employerId: employerId[j.employer],
      },
      create: {
        id: jobId, title: j.title, description: `We're hiring a ${j.title}. Supportive team, flexible hours and growth opportunities for women re-entering the workforce.`,
        category: j.category, location: j.location, jobType: j.jobType, salaryMin: j.salaryMin, salaryMax: j.salaryMax, isActive: true, employerId: employerId[j.employer],
      },
    });
  }
  console.log(`Upserted ${JOBS.length} jobs`);

  // Applications for Test User: shortlisted / pending / rejected
  const APPLICATIONS = [
    { id: "seed-app-1", jobId: "seed-job-1", status: "SHORTLISTED", coverNote: "I have hands-on tailoring and design experience and would love this role." },
    { id: "seed-app-2", jobId: "seed-job-2", status: "PENDING", coverNote: "I write clear, engaging content and can start immediately." },
    { id: "seed-app-3", jobId: "seed-job-5", status: "REJECTED", coverNote: "Interested in the beauty consultant position." },
  ];
  for (const a of APPLICATIONS) {
    await prisma.application.upsert({
      where: { jobId_userId: { jobId: a.jobId, userId: testUserId } },
      update: { status: a.status, coverNote: a.coverNote },
      create: { id: a.id, jobId: a.jobId, userId: testUserId, status: a.status, coverNote: a.coverNote, appliedAt: daysAgo(10) },
    });
  }
  console.log("Upserted 3 applications for Test User (shortlisted / pending / rejected)");

  // One interview on the shortlisted application
  const shortlistedApp = await prisma.application.findUnique({
    where: { jobId_userId: { jobId: "seed-job-1", userId: testUserId } },
  });
  if (shortlistedApp) {
    await prisma.interview.upsert({
      where: { applicationId: shortlistedApp.id },
      update: { scheduledAt: daysFromNow(3), mode: "ONLINE", status: "SCHEDULED", location: "https://meet.example.com/elevateher-interview", notes: "Intro call with the design lead." },
      create: {
        id: "seed-interview-1", applicationId: shortlistedApp.id, scheduledAt: daysFromNow(3),
        mode: "ONLINE", status: "SCHEDULED", location: "https://meet.example.com/elevateher-interview", notes: "Intro call with the design lead.",
      },
    });
    console.log("Upserted 1 interview for the shortlisted application");
  }

  // Saved jobs (4)
  for (const num of [4, 5, 6, 7]) {
    await prisma.savedJob.upsert({
      where: { userId_jobId: { userId: testUserId, jobId: `seed-job-${num}` } },
      update: {},
      create: { id: `seed-saved-${num}`, userId: testUserId, jobId: `seed-job-${num}` },
    });
  }
  console.log("Upserted 4 saved jobs for Test User");

  // ─────────────────────────────────────────────────────────────────────────
  // MARKETPLACE — 15 PRODUCTS across sellers/categories
  // ─────────────────────────────────────────────────────────────────────────
  const PRODUCT_CATEGORIES = ["Textiles", "Jewellery", "Home", "Beauty", "Food", "Art"];
  const PRODUCT_NAMES = [
    "Hand-block Cotton Saree", "Terracotta Earrings", "Macrame Wall Hanging", "Herbal Soap Set", "Homemade Mango Pickle", "Madhubani Painting",
    "Embroidered Cushion Cover", "Silver Oxidised Necklace", "Bamboo Table Lamp", "Aloe Vera Face Cream", "Roasted Millet Snacks", "Warli Art Coasters",
    "Handloom Dupatta", "Beaded Bracelet Set", "Jute Storage Basket",
  ];
  for (let i = 0; i < PRODUCT_NAMES.length; i++) {
    const num = i + 1;
    const productId = `seed-product-${num}`;
    const category = PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length];
    const seller = (i % 2 === 0) ? sellerId[1] : sellerId[2];
    const price = 199 + (i * 100);
    await prisma.product.upsert({
      where: { id: productId },
      update: {
        name: PRODUCT_NAMES[i], description: `${PRODUCT_NAMES[i]} — handcrafted by a woman entrepreneur.`,
        category, price, stock: 25, isActive: true, sellerId: seller,
      },
      create: {
        id: productId, name: PRODUCT_NAMES[i], description: `${PRODUCT_NAMES[i]} — handcrafted by a woman entrepreneur.`,
        category, price, stock: 25, isActive: true, sellerId: seller,
      },
    });
  }
  const productPrice = (num) => 199 + (num - 1) * 100;
  console.log(`Upserted ${PRODUCT_NAMES.length} products`);

  // ─────────────────────────────────────────────────────────────────────────
  // CART (Test User) — 3 items
  // ─────────────────────────────────────────────────────────────────────────
  const cart = await prisma.cart.upsert({
    where: { userId: testUserId },
    update: {},
    create: { id: "seed-cart-test", userId: testUserId },
  });
  const cartProducts = [
    { productId: "seed-product-1", quantity: 1 },
    { productId: "seed-product-2", quantity: 2 },
    { productId: "seed-product-3", quantity: 1 },
  ];
  for (const ci of cartProducts) {
    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: ci.productId } },
      update: { quantity: ci.quantity },
      create: { id: `seed-cartitem-${ci.productId}`, cartId: cart.id, productId: ci.productId, quantity: ci.quantity },
    });
  }
  console.log("Upserted cart with 3 items for Test User");

  // ─────────────────────────────────────────────────────────────────────────
  // ORDERS (Test User) — Delivered / Shipped / Confirmed
  // ─────────────────────────────────────────────────────────────────────────
  const ORDERS = [
    { id: "seed-order-1", status: "DELIVERED", createdDaysAgo: 20, items: [{ n: 4, q: 1 }, { n: 5, q: 2 }] },
    { id: "seed-order-2", status: "SHIPPED", createdDaysAgo: 6, items: [{ n: 6, q: 1 }] },
    { id: "seed-order-3", status: "CONFIRMED", createdDaysAgo: 2, items: [{ n: 7, q: 1 }, { n: 8, q: 1 }] },
  ];
  for (const o of ORDERS) {
    const total = o.items.reduce((sum, it) => sum + productPrice(it.n) * it.q, 0);
    await prisma.order.upsert({
      where: { id: o.id },
      update: { status: o.status, paymentStatus: "PAID", totalAmount: total, shippingAddress: "12 MG Road, Mumbai, Maharashtra 400001" },
      create: {
        id: o.id, buyerId: testUserId, status: o.status, paymentStatus: "PAID",
        totalAmount: total, shippingAddress: "12 MG Road, Mumbai, Maharashtra 400001",
      },
    });
    for (const it of o.items) {
      const orderItemId = `seed-orderitem-${o.id}-${it.n}`;
      await prisma.orderItem.upsert({
        where: { id: orderItemId },
        update: { quantity: it.q, priceAtPurchase: productPrice(it.n) },
        create: { id: orderItemId, orderId: o.id, productId: `seed-product-${it.n}`, quantity: it.q, priceAtPurchase: productPrice(it.n) },
      });
    }
  }
  console.log("Upserted 3 orders (Delivered / Shipped / Confirmed) with items");

  // ─────────────────────────────────────────────────────────────────────────
  // NOTIFICATIONS (10, mixed types) for Test User
  // ─────────────────────────────────────────────────────────────────────────
  const NOTIFICATIONS = [
    { type: "course", title: "You earned a certificate!", body: "Congrats on completing Tailoring & Stitching Basics.", link: "/app/certificates", read: true },
    { type: "course", title: "Keep learning", body: "You're 60% through Everyday Cooking for Small Businesses.", link: "/app/learn/seed-course-2", read: false },
    { type: "job", title: "Application shortlisted", body: "You've been shortlisted for Junior Fashion Designer.", link: "/app/earn/seed-job-1", read: false },
    { type: "job", title: "Interview scheduled", body: "Your interview is scheduled — check the details.", link: "/app/earn/mine", read: false },
    { type: "job", title: "Application update", body: "Your application for Beauty Consultant was not selected.", link: "/app/earn/seed-job-5", read: true },
    { type: "order", title: "Order delivered", body: "Your order #seed-ord-1 has been delivered.", link: "/app/orders", read: true },
    { type: "order", title: "Order shipped", body: "Your order #seed-ord-2 is on the way.", link: "/app/orders", read: false },
    { type: "message", title: "New message from Meena Crafts", body: "Thanks for your order! Let us know if you have questions.", link: "/app/notifications", read: false },
    { type: "system", title: "Welcome to ElevateHer", body: "Complete your resume to unlock better job matches.", link: "/app/resume", read: true },
    { type: "system", title: "New courses added", body: "Explore fresh courses picked for you.", link: "/app/learn", read: false },
  ];
  for (let i = 0; i < NOTIFICATIONS.length; i++) {
    const n = NOTIFICATIONS[i];
    await prisma.notification.upsert({
      where: { id: `seed-notif-${i + 1}` },
      update: { type: n.type, title: n.title, body: n.body, link: n.link, read: n.read },
      create: { id: `seed-notif-${i + 1}`, userId: testUserId, type: n.type, title: n.title, body: n.body, link: n.link, read: n.read },
    });
  }
  console.log(`Upserted ${NOTIFICATIONS.length} notifications`);

  // ─────────────────────────────────────────────────────────────────────────
  // REVIEWS — course, product, and employer/job (user-to-user)
  // ─────────────────────────────────────────────────────────────────────────

  // Course reviews (unique per course+user)
  const COURSE_REVIEWS = [
    { id: "seed-crev-1", courseId: "seed-course-1", userId: testUserId, rating: 5, comment: "Loved it — I can stitch a full kurti now!" },
    { id: "seed-crev-2", courseId: "seed-course-2", userId: testUserId, rating: 4, comment: "Very practical for starting a tiffin service." },
    { id: "seed-crev-3", courseId: "seed-course-3", userId: "seed-emp-1", rating: 5, comment: "Great foundation for digital skills." },
    { id: "seed-crev-4", courseId: "seed-course-5", userId: "seed-sel-1", rating: 4, comment: "Beautiful decor ideas, well explained." },
  ];
  for (const r of COURSE_REVIEWS) {
    await prisma.courseReview.upsert({
      where: { courseId_userId: { courseId: r.courseId, userId: r.userId } },
      update: { rating: r.rating, comment: r.comment },
      create: { id: r.id, courseId: r.courseId, userId: r.userId, rating: r.rating, comment: r.comment },
    });
  }

  // Product reviews (unique per product+user) — Test User reviews items from the delivered order
  const PRODUCT_REVIEWS = [
    { id: "seed-prev-1", productId: "seed-product-4", userId: testUserId, rating: 5, comment: "The herbal soaps smell amazing and last long." },
    { id: "seed-prev-2", productId: "seed-product-5", userId: testUserId, rating: 4, comment: "Delicious mango pickle, just like homemade." },
  ];
  for (const r of PRODUCT_REVIEWS) {
    await prisma.productReview.upsert({
      where: { productId_userId: { productId: r.productId, userId: r.userId } },
      update: { rating: r.rating, comment: r.comment },
      create: { id: r.id, productId: r.productId, userId: r.userId, rating: r.rating, comment: r.comment },
    });
  }

  // Employer/user reviews tied to a job (unique per job+reviewer+reviewee)
  const JOB_REVIEWS = [
    { id: "seed-rev-1", jobId: "seed-job-1", reviewerId: "seed-emp-1", revieweeId: testUserId, rating: 5, comment: "Punctual, skilled and a pleasure to work with." },
    { id: "seed-rev-2", jobId: "seed-job-1", reviewerId: testUserId, revieweeId: "seed-emp-1", rating: 5, comment: "Supportive employer and clear communication." },
  ];
  for (const r of JOB_REVIEWS) {
    await prisma.review.upsert({
      where: { jobId_reviewerId_revieweeId: { jobId: r.jobId, reviewerId: r.reviewerId, revieweeId: r.revieweeId } },
      update: { rating: r.rating, comment: r.comment },
      create: { id: r.id, jobId: r.jobId, reviewerId: r.reviewerId, revieweeId: r.revieweeId, rating: r.rating, comment: r.comment },
    });
  }
  console.log("Upserted course, product and employer reviews");

  console.log("\n✅ Seed complete. Login: test@test.com / Password123!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
