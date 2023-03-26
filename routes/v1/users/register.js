const express = require("express");
const router = express.Router();

const { register } = require("../../../controler/v1/users/register");

router.get("/", register);

module.exports = router;