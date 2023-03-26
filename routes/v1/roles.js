const express = require("express");
const router = express.Router();

// roles controlers
const { getRoles, postCreateRole } = require("../../controler/v1/roles/roles");

// return roles list
router.get("/", getRoles);

// create a subject
router.post("/", postCreateRole);

module.exports = router;