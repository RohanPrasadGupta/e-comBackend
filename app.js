const express = require("express");
const cors = require("cors");

const productRouter = require("./routes/products/productRoutes");

const reviewRouter = require("./routes/products/reviewRoutes");

const userRouter = require("./routes/users/userRoutes");

const cartRouter = require("./routes/cart/cartRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD,SET",
  credentials: true,
};
app.use(cors());
app.use(express.json());

// using the Routers
app.use("/", productRouter);
app.use("/", reviewRouter);
app.use("/", userRouter);
app.use("/", cartRouter);

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
