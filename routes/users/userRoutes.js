const express = require("express");
const userController = require("../../services/userServices");
const router = express.Router();

router.post("/user/signup", userController.signUp);
router.post("/user/signin", userController.signIn);
router.post("/admin/signin", userController.adminLogin);

router.get("/user/signOut", userController.signOutUser);

module.exports = router;
