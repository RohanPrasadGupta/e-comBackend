const jwt = require("jsonwebtoken");

const secretKey = "secretKey1234";

exports.verifyAdminToken = (req, res, next) => {
  const token = req.cookies.cookie;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access, please log in",
    });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
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
