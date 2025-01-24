const express = require("express");
const userController = require("../../services/userServices");
const router = express.Router();

router.route("/user").post(userController.addUser).get(userController.getUSer);

module.exports = router;
