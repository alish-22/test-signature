// server/routes/auditRoutes.js
const express = require("express");
const router = express.Router(); 

router.get("/", (req, res) => {
    res.send("Audit routes working");
});

module.exports = router;