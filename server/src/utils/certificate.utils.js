import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import PDFDocument from "pdfkit";
import streamifier from "streamifier";

// ============================================================
// CLOUDINARY CONFIG
// ============================================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ============================================================
// FILE UPLOAD CONFIG
// ============================================================

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(
      new Error("Only PDF, JPG, and PNG files are allowed"),
      false
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
});

// ============================================================
// UPLOAD BUFFER TO CLOUDINARY
// ============================================================

const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "campushub/certificates",
        resource_type: "auto",
        ...options,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
        });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// ============================================================
// DELETE FILE FROM CLOUDINARY
// ============================================================

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) {
    return;
  }

  return cloudinary.uploader.destroy(publicId, {
    resource_type: "auto",
  });
};

// ============================================================
// GENERATE CERTIFICATE PDF
// ============================================================

const streamGeneratedCertificatePdf = (res, certificate) => {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${certificate.credentialId}_Certificate.pdf"`
  );

  doc.pipe(res);

  // ============================================================
  // BORDER
  // ============================================================

  doc
    .rect(
      20,
      20,
      doc.page.width - 40,
      doc.page.height - 40
    )
    .lineWidth(2)
    .strokeColor("#0891b2")
    .stroke();

  // ============================================================
  // HEADER
  // ============================================================

  doc
    .fontSize(12)
    .fillColor("#0891b2")
    .text(
      "CAMPUSHUB AI — CERTIFICATE OF COMPLETION",
      {
        align: "center",
      }
    )
    .moveDown(2);

  // ============================================================
  // CERTIFICATE TITLE
  // ============================================================

  doc
    .fontSize(28)
    .fillColor("#0f172a")
    .text(certificate.title, {
      align: "center",
    })
    .moveDown(1);

  // ============================================================
  // ISSUER
  // ============================================================

  doc
    .fontSize(14)
    .fillColor("#334155")
    .text(`Issued by ${certificate.issuer}`, {
      align: "center",
    })
    .moveDown(2);

  // ============================================================
  // CREDENTIAL DETAILS
  // ============================================================

  doc
    .fontSize(11)
    .fillColor("#475569")
    .text(
      `Credential ID: ${certificate.credentialId}`,
      {
        align: "center",
      }
    )
    .text(
      `Issue Date: ${new Date(
        certificate.issueDate
      ).toLocaleDateString()}`,
      {
        align: "center",
      }
    );

  // ============================================================
  // SKILLS
  // ============================================================

  if (certificate.skills?.length) {
    doc
      .moveDown(1)
      .fontSize(11)
      .text(
        `Skills: ${certificate.skills.join(", ")}`,
        {
          align: "center",
        }
      );
  }

  // ============================================================
  // VERIFICATION URL
  // ============================================================

  doc
    .moveDown(3)
    .fontSize(9)
    .fillColor("#94a3b8")
    .text(
      `Verify at: ${
        process.env.CLIENT_URL || ""
      }/verify/${certificate.credentialId}`,
      {
        align: "center",
      }
    );

  // Finish PDF
  doc.end();
};

// ============================================================
// EXPORTS
// ============================================================

export {
  upload,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
  streamGeneratedCertificatePdf,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
};