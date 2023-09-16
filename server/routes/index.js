const express = require("express");
const router = express.Router();

const recipeRoute = require("./recipeRoutes");
const userRoute = require("./usersRoutes");

router.use("/", recipeRoute);
router.use("/user", userRoute);

module.exports = router;
