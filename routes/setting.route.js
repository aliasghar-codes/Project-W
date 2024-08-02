import express from "express";
import { getTotalData, getTotalPartyData, getBills, getAllBills, getTotalBills, printHomeData } from "../controllers/setting.controller.js"

const router = express.Router();

router.post("/total-sale", getTotalData);
router.post("/total-party-sale", getTotalPartyData);
router.post("/get-bills", getBills);
router.post("/get-all-bills", getAllBills);
router.post("/bill-sheet", getTotalBills);
router.post("/print-home-data", printHomeData);

export default router;