import express from "express";
import auth from "../middleware/auth.js";
import { check, validationResult } from "express-validator";
import checkRole from "../middleware/checkRole.js";
import Job from "../models/Job.js";

const router = express.Router();
/*
1- POST/jobs
2- GET/jobs
3- GET/jobs/:jobId
4- DELETE/jobs/:jobId
5- PUT/jobs/:jobId
*/

// @route   POST /api/postJobs
// @desc    Create new Job
// @access  Private (company only)

router.post(
  "/postJobs",
  auth,
  checkRole("company"),
  check("jobTitle", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("location", "Location is required").notEmpty(),
  check("salary", "Salary is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => {
      if (new Date(value) > new Date()) {
        throw new Error("From date must be in the past");
      }
      return true;
    }),

  check("jobDescription")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Job description must be less than 1000 characters"),
  check("salaryPeriod")
    .optional()
    .isIn(["hourly", "monthly", "yearly"])
    .withMessage("Salary period must be one of: hourly, monthly, yearly"),
  check("jobType")
    .optional()
    .isIn(["full-time", "part-time", "internship", "freelance"])
    .withMessage("Job type must be one of: full-time, part-time"),
  check("workType")
    .isIn(["Remote", "onsite", "Hybrid"])
    .withMessage("Work type must be one of: Remote, onsite, Hybrid"),
  check("experienceLevel")
    .optional()
    .isIn(["entry", "mid", "senior"])
    .withMessage("Experience level must be one of: entry, mid, senior"),
  check("Requirements")
    .optional()
    .isArray()
    .withMessage("Requirements should be an array"),
  check("Responsibilities")
    .optional()
    .isArray()
    .withMessage("Responsibilities should be an array"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let job = new Job({
        user: req.user.id,
        jobTitle: req.body.jobTitle,
        companyName: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        jobDescription: req.body.jobDescription,
        salaryPeriod: req.body.salaryPeriod,
        jobType: req.body.jobType,
        Requirements: req.body.Requirements,
        Responsibilities: req.body.Responsibilities,
        experienceLevel: req.body.experienceLevel,
        salary: req.body.salary,
        workType: req.body.workType,
        isHidden: false,
      });
      await job.save();
      return res.json(job);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }
);
// @route   GET /api/Jobs
// @desc    get all Jobs
// @access  Private (company only)

router.get("/", async (req, res) => {
  try {
    let jobsPosts = await Job.find().sort({ date: -1 });
    res.json(jobsPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   GET /api/jobs/search?keyword=developer
// @desc    Search jobs by title or company name (case-insensitive)
// @access  Public (for users search)=
router.get("/search", async (req, res) => {
  const keyword = req.query.keyword || "";
  try {
    const regex = new RegExp(keyword, "i"); // case-insensitive and flexible
    const jobs = await Job.find({
      $or: [{ jobTitle: regex }, { companyName: regex }, { location: regex }],
    }).sort({ date: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/Jobs
// @desc    get a job by id
// @access  Private (company only)
router.get("/:jobId", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   DELETE /api/jobId
// @desc    delete a job by id
// @access  Private (company only)
router.delete("/:jobId", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }
    await job.deleteOne();
    res.json({ msg: "Job removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   PUT /api/jobId
// @desc    edit a job by id
// @access  Private (company only)
router.put("/:jobId", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    job.jobTitle = req.body.jobTitle;
    job.companyName = req.body.companyName;
    job.location = req.body.location;
    job.from = req.body.from;
    job.to = req.body.to;
    job.current = req.body.current;
    job.jobDescription = req.body.jobDescription;
    job.salaryPeriod = req.body.salaryPeriod;
    job.jobType = req.body.jobType;
    job.Requirements = req.body.Requirements;
    job.Responsibilities = req.body.Responsibilities;
    job.experienceLevel = req.body.experienceLevel;
    job.salary = req.body.salary;
    job.workType = req.body.workType;
    await job.save();
    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.post("/apply/:jobId", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }
    if (
      job.applicants.some(
        (applicant) => applicant.userId.toString() === req.user.id
      )
    ) {
      return res
        .status(400)
        .json({ msg: "You have already applied to this job" });
    }

    job.applicants.push({
      userId: req.user.id,
      name: req.user.name,
      email: req.user.email,
      applicationDate: new Date(),
    });
    await job.save();
    res.json({ msg: "Application submitted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.get("/companyJobs/:userId", async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.params.userId }).sort({
      date: -1,
    });
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.patch("/:id/hide", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isHidden: true },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/unhide", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isHidden: false },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
