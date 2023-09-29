import express from "express";
import expressLayout from "express-ejs-layouts";
import errorHandler from "./server/middleware/errorMiddleware.js";
import connectDB from "./server/config/dbconfig.js";
import { authCredentialsViewEngine } from "./server/middleware/authMiddleware.js";

import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(expressLayout);

app.use(cookieParser("CookingBlogSecure"));
app.use(
  session({
    secret: "CookingBlogSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(authCredentialsViewEngine);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

import routes from "./server/routes/index.js";
app.use("/", routes);

app.use(errorHandler);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
