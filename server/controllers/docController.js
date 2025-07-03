const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
  try {
    const newDoc = new Document({
      userId: req.body.userId,
      fileName: req.file.originalname,
      filePath: req.file.path
    });

    await newDoc.save();
    res.status(201).json({ msg: "Document uploaded successfully", document: newDoc });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload document" });
  }
};

exports.getDocumentsByUser = async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.params.userId });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching documents" });
  }
};