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

router.post(
  "/postJobs",
  auth,
  checkRole("company"),
  check("jobTitle", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("location", "Location is required").notEmpty(),
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
    .withMessage(
      "Job type must be one of: full-time, part-time, internship, freelance"
    ),
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
      });
      await job.save();
      return res.json(job);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    let jobsPosts = await Job.find().sort({ date: -1 });
    res.json(jobsPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

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
    await job.save();
    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// ! Ask someone about this
// router.put("/experience/:jobId", auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.jobId);
//     if(!job){
//       return res.status(404).json({msg: "Job not found"});
//     }
//     job.experienceLevel = req.body.experienceLevel;

//     await job.save();
//     res.json(job);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(error.message);
//   }
// });



export default router;
