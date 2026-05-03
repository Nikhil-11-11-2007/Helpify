import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    createFaq,
    getFaqs,
    updateFaq,
    deleteFaq,
    getSettings,
    updateSettings,
} from "../controllers/business.controller.js";

const router = Router();

router.post("/faqs", authUser, createFaq);
router.get("/faqs", authUser, getFaqs);
router.put("/faqs/:faqId", authUser, updateFaq);
router.delete("/faqs/:faqId", authUser, deleteFaq);
router.get("/settings", authUser, getSettings);
router.put("/settings", authUser, updateSettings);

export default router;
