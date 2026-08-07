import express from "express";

import {
generateResume
} from "../controllers/resumeController.js";

import protect from "../middleware/authMiddleware.js";


const router=express.Router();


router.post(
"/generate",
protect,
generateResume
);


export default router;