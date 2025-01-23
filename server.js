const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const user = process.env.USER;
const password = process.env.PASSWORD;

const DB = `mongodb+srv://${user}:${password}@ecommerce.hwg9j.mongodb.net/`;
mongoose
  .connect(DB)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
