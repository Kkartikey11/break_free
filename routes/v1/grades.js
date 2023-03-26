const express = require("express");
const router = express.Router();

// grades controlers
const { getGrades, postCreateGrade } = require("../../controler/v1/grades/grades");

// return grades list
router.get("/", getGrades);

// create a grade
router.post("/", postCreateGrade);

module.exports = router;