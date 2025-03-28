const jwt = require("jsonwebtoken");

const secretKey = "secretKey1234";

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.cookie;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access from middleware, please log in",
    });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token expired, please log in again",
      });
    }
    res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

exports.verifyTokenAndAdmin = (req, res, next) => {
  const token = req.cookies.cookie;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access, please log in",
    });
  }
  try {
    const decoded = jwt.verify(token, secretKey);

    if (decoded.isAdmin !== true) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access!",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token expired, please log in again",
      });
    }
    res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};
