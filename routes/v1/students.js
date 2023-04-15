const express = require("express");
const router = express.Router();

// students controlers
const { getStudents, postCreateStudent, postDeleteStudent, postEditStudent } = require("../../controler/v1/students/students");

// return students list
router.get("/", getStudents);

// create a subject
router.post("/", postCreateStudent);

// delete a subject
router.post("/:studentId/delete", postDeleteStudent);

// edit a subject
router.post("/:studentId", postEditStudent);

module.exports = router;