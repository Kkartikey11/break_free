const express = require("express");
const router = express.Router();

// subjects controlers
const { getSubjects, postCreateSubject, postUpdateSubject, postDeleteSubject } = require("../../controler/v1/subjects/subjects");

// return subjects list
router.get("/", getSubjects);

// create a subject
router.post("/", postCreateSubject);

// delete a subject
router.post("/:subjectId(\\d+)/delete", postDeleteSubject);

// update a subject
router.post("/:subjectId(\\d+)", postUpdateSubject);

module.exports = router;