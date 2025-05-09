import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

// regestir a new company 
router.post("/register", async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json({ message: "Company registration submitted for review." });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//  the admin verifiy the company 
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

// get all companies for admin dashboard
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;
