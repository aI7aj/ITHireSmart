import express from "express";
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import Course from "../models/Course.js";

const router = express.Router();

// @route   POST /api/courses
// @desc    Create new course
// @access  Private (company only)
router.post(
  "/postCourse",
  auth,
  checkRole("company"),
  check("courseTitle", "Course title is required").notEmpty(),
  check("location", "Location is required").notEmpty(),
  check("startAt", "Start date is required")
  .notEmpty()
  .custom((value, { req }) => {
    const startAt = new Date(value);
    const now = new Date();
    const endAt = new Date(req.body.endAt);

    if (startAt <= now) {
      throw new Error("Start date must be more than the current date");
    }

    if (endAt && startAt >= endAt) {
      throw new Error("Start date must be before the end date");
    }

    return true;
  }),

  check("endAt", "End date is required")
    .notEmpty()
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startAt)) {
        throw new Error("End date must be after the start date");
      }
      return true;
    }),
  check("description", "Description is required").notEmpty().isLength({ max: 1000 }),
  check("topics", "Topics are required").isArray(),
  check("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive number"),
  check("studentsEnrolled")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Number of students must be a positive number or zero"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const course = new Course({
        user: req.user.id,
        courseTitle: req.body.courseTitle,
        instructorName: req.body.instructorName,
        location: req.body.location,
        courseType: req.body.courseType,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
        description: req.body.description,
        capacity: req.body.capacity,
        studentsEnrolled: req.body.studentsEnrolled,
        topics: req.body.topics,
        registrationLink: req.body.registrationLink,
        materials: req.body.materials,
      });

      await course.save();
      res.json(course);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/courses/:courseId
// @desc    Get course by ID
// @access  Private
router.get("/:courseId", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/courses/:courseId
// @desc    Delete course
// @access  Private
router.delete("/:courseId", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    await course.deleteOne();
    res.json({ msg: "Course removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/courses/:courseId
// @desc    Update course
// @access  Private
router.put("/:courseId", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    course.courseTitle = req.body.courseTitle;
    course.instructorName = req.body.instructorName;
    course.location = req.body.location;
    course.courseType = req.body.courseType;
    course.startAt = req.body.startAt;
    course.endAt = req.body.endAt;
    course.description = req.body.description;
    course.capacity = req.body.capacity;
    course.studentsEnrolled = req.body.studentsEnrolled;
    course.topics = req.body.topics;
    course.registrationLink = req.body.registrationLink;
    course.materials = req.body.materials;

    await course.save();
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
