const express = require("express");
const router = express.Router();

// user login controlers
const { postLogin } = require("../../../controler/v1/users/login");

// user login
router.post("/", postLogin);

module.exports = router;