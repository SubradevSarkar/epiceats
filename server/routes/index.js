import express from "express";
const router = express.Router();
import { authUser } from "../middleware/authMiddleware.js";

import recipeRoute from "./recipeRoutes.js";
import userRoute from "./usersRoutes.js";

router.use("/", authUser, recipeRoute);
router.use("/user", authUser, userRoute);

export default router;
