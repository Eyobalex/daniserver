import express from "express";
const router = express.Router();

import { signin, signup, activateHandle } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get('/activate/:token', activateHandle);


export default router;