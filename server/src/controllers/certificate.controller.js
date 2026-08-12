import Certificate from "../models/Certificate.js";

import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
  streamGeneratedCertificatePdf,
} from "../utils/certificate.utils.js";

// ============================================================
// GET ALL CERTIFICATES
// GET /api/certificates
// Protected
// ============================================================

export const getCertificates = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = {
      user: req.user._id,
    };

    // Category filter
    if (category && category !== "all") {
      filter.category = category;
    }

    // Search filter
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");

      filter.$or = [
        { title: regex },
        { issuer: regex },
        { skills: regex },
      ];
    }

    const certificates = await Certificate.find(filter)
      .sort({ issueDate: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error("GET CERTIFICATES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
    });
  }
};

// ============================================================
// GET UPCOMING CERTIFICATES
// GET /api/certificates/upcoming
// Protected
// ============================================================

export const getUpcomingCertificates = async (req, res) => {
  try {
    const today = new Date();

    // Start of today
    today.setHours(0, 0, 0, 0);

    const certificates = await Certificate.find({
      user: req.user._id,
      issueDate: { $gt: today },
    })
      .sort({ issueDate: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error(
      "GET UPCOMING CERTIFICATES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming certificates",
    });
  }
};

// ============================================================
// GET SINGLE CERTIFICATE
// GET /api/certificates/:id
// Protected + ownership check
// ============================================================

export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error("GET CERTIFICATE ERROR:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificate",
    });
  }
};

// ============================================================
// CREATE CERTIFICATE
// POST /api/certificates
// Protected
// ============================================================

export const createCertificate = async (req, res) => {
  try {
    const {
      title,
      issuer,
      category,
      difficulty,
      credentialId,
      credentialUrl,
      issueDate,
      expiryDate,
      description,
      skills,
    } = req.body;

    // ----------------------------------------------------------
    // Required fields
    // ----------------------------------------------------------

    if (!title?.trim() || !issuer?.trim() || !issueDate) {
      return res.status(400).json({
        success: false,
        message:
          "Title, issuer, and issue date are required",
      });
    }

    // ----------------------------------------------------------
    // Credential ID
    // ----------------------------------------------------------

    const finalCredentialId =
      credentialId?.trim() ||
      Certificate.generateCredentialId(issuer);

    const existingCertificate =
      await Certificate.findOne({
        credentialId: finalCredentialId,
      });

    if (existingCertificate) {
      return res.status(409).json({
        success: false,
        message:
          "A certificate with this credential ID already exists",
      });
    }

    // ----------------------------------------------------------
    // Parse skills
    // ----------------------------------------------------------

    let parsedSkills = [];

    if (Array.isArray(skills)) {
      parsedSkills = skills
        .map((skill) => String(skill).trim())
        .filter(Boolean);
    } else if (
      typeof skills === "string" &&
      skills.trim()
    ) {
      try {
        const parsed = JSON.parse(skills);

        if (Array.isArray(parsed)) {
          parsedSkills = parsed
            .map((skill) => String(skill).trim())
            .filter(Boolean);
        } else {
          parsedSkills = skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
        }
      } catch {
        parsedSkills = skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }
    }

    parsedSkills = [...new Set(parsedSkills)];

    // ----------------------------------------------------------
    // Upload certificate file
    // ----------------------------------------------------------

    let certificateFile = {
      url: null,
      publicId: null,
      format: null,
    };

    if (req.file) {
      try {
        certificateFile =
          await uploadBufferToCloudinary(
            req.file.buffer
          );
      } catch (uploadError) {
        console.error(
          "CERTIFICATE CLOUDINARY UPLOAD ERROR:",
          uploadError
        );

        return res.status(500).json({
          success: false,
          message: "Certificate file upload failed",
        });
      }
    }

    // ----------------------------------------------------------
    // Create certificate
    // ----------------------------------------------------------

    const certificate = await Certificate.create({
      user: req.user._id,

      title: title.trim(),
      issuer: issuer.trim(),

      category: category || "other",
      difficulty: difficulty || "Intermediate",

      credentialId: finalCredentialId,

      credentialUrl:
        credentialUrl?.trim() || null,

      issueDate,

      expiryDate: expiryDate || null,

      description: description?.trim() || "",

      skills: parsedSkills,

      certificateFile,

      verified: true,
      status: "active",
    });

    return res.status(201).json({
      success: true,
      message: "Certificate added successfully",
      data: certificate,
    });
  } catch (error) {
    console.error(
      "CREATE CERTIFICATE ERROR:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Certificate credential ID already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create certificate",
    });
  }
};

// ============================================================
// UPDATE CERTIFICATE
// PUT /api/certificates/:id
// Protected + ownership check
// ============================================================

export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    // ----------------------------------------------------------
    // Editable fields
    // ----------------------------------------------------------

    const editableFields = [
      "title",
      "issuer",
      "category",
      "difficulty",
      "credentialUrl",
      "issueDate",
      "expiryDate",
      "description",
    ];

    editableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        certificate[field] =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];
      }
    });

    // ----------------------------------------------------------
    // Parse skills
    // ----------------------------------------------------------

    if (req.body.skills !== undefined) {
      let updatedSkills = [];

      if (Array.isArray(req.body.skills)) {
        updatedSkills = req.body.skills;
      } else if (
        typeof req.body.skills === "string" &&
        req.body.skills.trim()
      ) {
        try {
          const parsed = JSON.parse(
            req.body.skills
          );

          updatedSkills = Array.isArray(parsed)
            ? parsed
            : req.body.skills.split(",");
        } catch {
          updatedSkills =
            req.body.skills.split(",");
        }
      }

      certificate.skills = [
        ...new Set(
          updatedSkills
            .map((skill) =>
              String(skill).trim()
            )
            .filter(Boolean)
        ),
      ];
    }

    // ----------------------------------------------------------
    // Replace uploaded certificate file
    // ----------------------------------------------------------

    if (req.file) {
      try {
        if (
          certificate.certificateFile?.publicId
        ) {
          await deleteFromCloudinary(
            certificate.certificateFile.publicId
          );
        }

        certificate.certificateFile =
          await uploadBufferToCloudinary(
            req.file.buffer
          );
      } catch (uploadError) {
        console.error(
          "UPDATE CERTIFICATE FILE ERROR:",
          uploadError
        );

        return res.status(500).json({
          success: false,
          message:
            "Certificate file upload failed",
        });
      }
    }

    await certificate.save();

    return res.status(200).json({
      success: true,
      message:
        "Certificate updated successfully",
      data: certificate,
    });
  } catch (error) {
    console.error(
      "UPDATE CERTIFICATE ERROR:",
      error
    );

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update certificate",
    });
  }
};

// ============================================================
// DELETE CERTIFICATE
// DELETE /api/certificates/:id
// Protected + ownership check
// ============================================================

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    // Delete Cloudinary file
    if (
      certificate.certificateFile?.publicId
    ) {
      try {
        await deleteFromCloudinary(
          certificate.certificateFile.publicId
        );
      } catch (cloudinaryError) {
        console.error(
          "CLOUDINARY DELETE ERROR:",
          cloudinaryError
        );
      }
    }

    await certificate.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Certificate deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE CERTIFICATE ERROR:",
      error
    );

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete certificate",
    });
  }
};

// ============================================================
// DOWNLOAD CERTIFICATE
// GET /api/certificates/:id/download
// Protected + ownership check
// ============================================================

export const downloadCertificate = async (
  req,
  res
) => {
  try {
    const certificate =
      await Certificate.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    // ----------------------------------------------------------
    // Real uploaded certificate exists
    // ----------------------------------------------------------

    if (certificate.certificateFile?.url) {
      const downloadUrl =
        certificate.certificateFile.url.replace(
          "/upload/",
          "/upload/fl_attachment/"
        );

      return res.redirect(downloadUrl);
    }

    // ----------------------------------------------------------
    // No uploaded file → generate PDF
    // ----------------------------------------------------------

    return streamGeneratedCertificatePdf(
      res,
      certificate
    );
  } catch (error) {
    console.error(
      "DOWNLOAD CERTIFICATE ERROR:",
      error
    );

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to download certificate",
    });
  }
};

// ============================================================
// PUBLIC CERTIFICATE VERIFICATION
// GET /api/certificates/verify/:credentialId
// PUBLIC — NO AUTH REQUIRED
// ============================================================

export const verifyCertificate = async (
  req,
  res
) => {
  try {
    const credentialId =
      req.params.credentialId?.trim();

    if (!credentialId) {
      return res.status(400).json({
        success: false,
        valid: false,
        message:
          "Credential ID is required",
      });
    }

    const certificate =
      await Certificate.findOne({
        credentialId,
      });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        valid: false,
        message:
          "No certificate found with this credential ID",
      });
    }

    // ----------------------------------------------------------
    // Revoked certificate
    // ----------------------------------------------------------

    if (certificate.status === "revoked") {
      return res.status(200).json({
        success: true,
        valid: false,
        message:
          "This certificate has been revoked",
      });
    }

    // ----------------------------------------------------------
    // Expiry check
    // ----------------------------------------------------------

    const isExpired = Boolean(
      certificate.expiryDate &&
        certificate.expiryDate.getTime() <
          Date.now()
    );

    if (isExpired) {
      return res.status(200).json({
        success: true,
        valid: false,
        message:
          "This certificate has expired",
        data: {
          title: certificate.title,
          issuer: certificate.issuer,
          credentialId:
            certificate.credentialId,
          issueDate:
            certificate.issueDate,
          expiryDate:
            certificate.expiryDate,
          skills: certificate.skills,
          verified: certificate.verified,
          isExpired: true,
          status: certificate.status,
        },
      });
    }

    // ----------------------------------------------------------
    // Public response
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      valid: true,

      data: {
        title: certificate.title,
        issuer: certificate.issuer,
        credentialId:
          certificate.credentialId,
        issueDate:
          certificate.issueDate,
        expiryDate:
          certificate.expiryDate,
        skills: certificate.skills,
        verified: certificate.verified,
        isExpired: false,
        status: certificate.status,
      },
    });
  } catch (error) {
    console.error(
      "VERIFY CERTIFICATE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      valid: false,
      message:
        "Certificate verification failed",
    });
  }
};