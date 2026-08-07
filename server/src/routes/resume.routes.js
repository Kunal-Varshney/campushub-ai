import express from "express";

import {
generateResume
} from "../controllers/resume.controller.js";

import protect from "../middleware/auth.middleware.js";


const router=express.Router();


router.post(
"/generate",
protect,
generateResume
);


export default router;