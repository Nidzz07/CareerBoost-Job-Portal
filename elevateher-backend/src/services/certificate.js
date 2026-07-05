const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Certificates are saved to /public/certificates and served statically
// (see app.js: app.use("/certificates", express.static(...))).
// Swapping this to upload to S3 later only requires changing this one file —
// the rest of the app just needs a URL back.
const CERTS_DIR = path.join(__dirname, "..", "..", "public", "certificates");

if (!fs.existsSync(CERTS_DIR)) {
  fs.mkdirSync(CERTS_DIR, { recursive: true });
}

/**
 * Generates a PDF certificate of completion and saves it to disk.
 * Returns the public URL path (e.g. "/certificates/<enrollmentId>.pdf").
 *
 * @param {Object} params
 * @param {string} params.enrollmentId - used as the filename, keeps it unique per enrollment
 * @param {string} params.userName
 * @param {string} params.courseTitle
 * @param {Date} params.completionDate
 */
function generateCertificate({ enrollmentId, userName, courseTitle, completionDate }) {
  return new Promise((resolve, reject) => {
    const fileName = `${enrollmentId}.pdf`;
    const filePath = path.join(CERTS_DIR, fileName);

    const doc = new PDFDocument({ layout: "landscape", size: "A4", margin: 50 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Border
    doc
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .lineWidth(3)
      .strokeColor("#6B4EFF")
      .stroke();

    doc
      .fontSize(32)
      .fillColor("#6B4EFF")
      .font("Helvetica-Bold")
      .text("Certificate of Completion", 0, 100, { align: "center" });

    doc
      .fontSize(14)
      .fillColor("#333333")
      .font("Helvetica")
      .text("This certificate is proudly presented to", 0, 170, { align: "center" });

    doc
      .fontSize(28)
      .fillColor("#111111")
      .font("Helvetica-Bold")
      .text(userName, 0, 200, { align: "center" });

    doc
      .fontSize(14)
      .fillColor("#333333")
      .font("Helvetica")
      .text("for successfully completing the course", 0, 250, { align: "center" });

    doc
      .fontSize(20)
      .fillColor("#111111")
      .font("Helvetica-Bold")
      .text(courseTitle, 0, 280, { align: "center" });

    const dateStr = new Date(completionDate).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    doc
      .fontSize(12)
      .fillColor("#555555")
      .font("Helvetica")
      .text(`Completed on ${dateStr}`, 0, 340, { align: "center" });

    doc
      .fontSize(10)
      .fillColor("#999999")
      .text("ElevateHer", 0, doc.page.height - 80, { align: "center" });

    doc.end();

    stream.on("finish", () => resolve(`/certificates/${fileName}`));
    stream.on("error", reject);
  });
}

module.exports = { generateCertificate };
