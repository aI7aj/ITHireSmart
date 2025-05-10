import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

// Register a new company (open to all)
router.post("/register", async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json({ message: "Company registration submitted for review." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin approves or denies a company
router.put("/verify/:id", async (req, res) => {
    const { status } = req.body;

    if (!["approved", "denied"].includes(status)) {
        return res.status(400).json({ message: "Status must be 'approved' or 'denied'." });
    }

    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ message: "Company not found." });

        company.status = status;
        await company.save();

        res.json({ message: `Company ${status}.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
