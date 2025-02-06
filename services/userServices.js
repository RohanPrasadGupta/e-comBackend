const UserModel = require("../models/userModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkout } = require("../routes/users/userRoutes");

const saltRounds = 10;
const secretKey = "secretKey1234";

exports.signUp = async (req, res) => {
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

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await UserModel.findOne({ email }).select("+password");
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

    const token = jwt.sign(
      {
        id: userDetails._id,
        email: userDetails.email,
        name: userDetails.name,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("cookie", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 1000 * 60 * 24, // 1 day,
    });

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        userDetails: {
          id: userDetails._id,
          email: userDetails.email,
          name: userDetails.name,
        },
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await UserModel.findOne({ email }).select("+password");
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
    } else if (!userDetails.isAdmin) {
      return res.status(404).json({
        status: "fail",
        message: "Login Failed!",
      });
    }

    const token = jwt.sign(
      {
        id: userDetails._id,
        email: userDetails.email,
        name: userDetails.name,
        isAdmin: true,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("cookie", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 1000 * 60 * 24, // 1 day,
    });

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        userDetails: {
          id: userDetails._id,
          email: userDetails.email,
          name: userDetails.name,
        },
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
      check: "admin",
    });
  }
};
