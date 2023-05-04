const express = require("express");
const router = express.Router();
const multer = require('multer');

// batches controlers
const { getUser, getUsers, postUpdateUser, postDeleteUser } = require("../../../controler/v1/users/users");
const { PostRegister } = require("../../../controler/v1/users/register")
const { postLogin } = require("../../../controler/v1/users/login")

const { postUploadUserProfilePicture } = require("../../../controler/v1/users/users");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/') // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, req.params.userId+".jpg") // Set the filename to the original name of the uploaded file
    }
});

const upload = multer({ storage: storage });

// return a user details
router.post("/:userId(\\d+)/delete", postDeleteUser);

// return a user details
router.get("/:userId(\\d+)", getUser);

// return a user details
router.post("/:userId(\\d+)", postUpdateUser);

// return a user details
router.post("/:userId(\\d+)/uploadProfilePicture", upload.single('image') , postUploadUserProfilePicture);

// return users list
router.get("/", getUsers);

// users register
router.post("/register", PostRegister);

// users login
router.post("/login", postLogin);

module.exports = router;