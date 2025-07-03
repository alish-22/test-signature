const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadDocument, getDocumentsByUser } = require("../controllers/docController");

// Setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload route
router.post("/upload", upload.single("pdf"), uploadDocument);

// Get documents by user
router.get("/:userId", getDocumentsByUser);

module.exports = router;