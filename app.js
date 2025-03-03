const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/products/productRoutes");

const reviewRouter = require("./routes/products/reviewRoutes");

const userRouter = require("./routes/users/userRoutes");

const cartRouter = require("./routes/cart/cartRoutes");

const orderRouter = require("./routes/orders/orderRouter");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://rpg-ecommerce.netlify.app/",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using the Routers
app.use("/", productRouter);
app.use("/", reviewRouter);
app.use("/", userRouter);
app.use("/", cartRouter);
app.use("/", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `cannot find ${req.originalUrl} on this site`,
  });
  next();
});

module.exports = app;
