// server/routes/signatureRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Signature routes working");
});

module.exports = router;