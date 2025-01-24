const UserModel = require("../models/userModel");
const bycrypt = require("bcrypt");

const saltRounds = 10;
const userHash = process.env.BYCRYPT_HASH;

exports.addUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bycrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await UserModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getUSer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDetails = await UserModel.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isPasswordMatch = await bycrypt.compare(
      password,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(404).json({
        status: "fail",
        message: "User id or password is incorrect",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        userDetails,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
