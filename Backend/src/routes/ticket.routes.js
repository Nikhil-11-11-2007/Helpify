import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
    getTickets,
    getTicket,
    updateStatus,
    replyToTicket,
} from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", authUser, getTickets);
router.get("/:ticketId", authUser, getTicket);
router.put("/:ticketId/status", authUser, updateStatus);
router.post("/:ticketId/reply", authUser, replyToTicket);

export default router;