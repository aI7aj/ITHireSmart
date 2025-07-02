import express from "express";
import cvUpload from "../../middleware/cvUpload.js";
import { analyzeCV } from "./cvHandlers.js"; // Adjust the import path as necessary

const router = express.Router();

router.post("/upload", cvUpload.single("cv"), analyzeCV);

export default router;
