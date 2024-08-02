import express from "express"
import { createDraw, deleteDraw, saveBill, getNumberInfo } from "../controllers/draw.controller.js";

const router = express.Router();

router.post("/create", createDraw);
router.post("/delete", deleteDraw);
router.post("/save", saveBill);
router.post("/get-number-info", getNumberInfo);

export default router;