const express = require("express");
const router = express.Router();

// subjects controlers
const { getSubjects, postCreateSubject } = require("../../controler/v1/subjects/subjects");

// return subjects list
router.get("/", getSubjects);

// create a subject
router.post("/", postCreateSubject);

module.exports = router;