import express from "express";
const router = express.Router();

import recipeRoute from "./recipeRoutes.js";
import userRoute from "./usersRoutes.js";

router.use("/", recipeRoute);
router.use("/user", userRoute);

export default router;
