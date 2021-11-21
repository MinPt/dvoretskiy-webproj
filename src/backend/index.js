const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const users = require("./routes/users");
const products = require("./routes/products");
const auth = require("./routes/auth");
const config = require("config");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error(config.get("jwtPrivateKey"));
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/shiny-shiny", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Cannot connect to db"));

app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, x-auth-token"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/auth", auth);
app.use(express.static("public"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
