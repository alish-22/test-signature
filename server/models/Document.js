const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileName: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", documentSchema);