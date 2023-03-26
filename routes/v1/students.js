const express = require("express");
const router = express.Router();

// students controlers
const { getStudents, postCreateStudent } = require("../../controler/v1/students/students");

// return students list
router.get("/", getStudents);

// create a subject
router.post("/", postCreateStudent);

module.exports = router;