const express = require("express");
const router = express.Router();

// grades controlers
const { getGrades, postCreateGrade, postUpdateGrade, postDeleteGrade } = require("../../controler/v1/grades/grades");

// return grades list
router.get("/", getGrades);

// create a grade
router.post("/", postCreateGrade);

// delete a grade
router.post("/:gradeId(\\d+)/delete", postDeleteGrade);

// update a grade
router.post("/:gradeId(\\d+)", postUpdateGrade);


module.exports = router;