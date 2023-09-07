require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const errorHandler = require("./server/middleware/errorMiddleware");
const connectDB = require("./server/config/dbconfig");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayout);
app.use(errorHandler);

app.use(cookieParser("CookingBlogSecure"));
app.use(
  session({
    secret: "CookingBlogSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
