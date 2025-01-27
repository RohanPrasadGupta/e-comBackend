const express = require("express");
const userController = require("../../services/userServices");
const router = express.Router();

router.post("/user/signup", userController.signUp);
router.post("/user/signin", userController.signIn);

module.exports = router;
