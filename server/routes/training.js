import express from "express";
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import Training from "../models/Training.js";

const router = express.Router();

// @route   POST /api/trainings
// @desc    Create new training
// @access  Private (company only)
router.post(
  "/postTraining",
  auth,
  checkRole("company"),
  check("trainingTitle", "Title is required").notEmpty(),
  check("location", "Location is required").notEmpty(),
  check("startAt", "Start date is required")
    .notEmpty(),
    
  check("endAt", "End date is required").notEmpty().custom((value) => {
    if (new Date(value) < new Date()) {
      throw new Error("End date must be after the start date");
    }
    return true;
  }),
  check("trainingDescription", "Description is required").notEmpty().isLength({ max: 1000 }),
  check("topicsCovered", "Topics covered is required").isArray(),
  check("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive number"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const training = new Training({
        user: req.user.id,
        trainingTitle: req.body.trainingTitle,
        companyName: req.body.companyName,
        location: req.body.location,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
        trainingType: req.body.trainingType,
        trainingDescription: req.body.trainingDescription,
        capacity: req.body.capacity,
        topicsCovered: req.body.topicsCovered,
      });

      await training.save();
      res.json(training);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }
);

// @route   GET /api/trainings
// @desc    Get all trainings
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.json(trainings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   GET /api/trainings/:trainingId
// @desc    Get training by ID
// @access  Private

router.get("/:trainingId", auth, async (req, res) => {
  try {
    const training = await Training.findById(req.params.trainingId);
    if (!training) {
      return res.status(404).json({ msg: "Training not found" });
    }
    res.json(training);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   DELETE /api/trainings/:trainingId
// @desc    Delete training
// @access  Private

router.delete("/:trainingId", auth, async (req, res) => {
  try {
    const training = await Training.findById(req.params.trainingId);
    if (!training) {
      return res.status(404).json({ msg: "Training not found" });
    }
    await training.deleteOne();
    res.json({ msg: "Training removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// @route   PUT /api/trainings/:trainingId
// @desc    Update training
// @access  Private
router.put("/:trainingId", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const training = await Training.findById(req.params.trainingId);
    if (!training) {
      return res.status(404).json({ msg: "Training not found" });
    }

    
    training.trainingTitle = req.body.trainingTitle;
    training.companyName = req.body.companyName;
    training.location = req.body.location;
    training.startAt = req.body.startAt;
    training.endAt = req.body.endAt;
    training.trainingType = req.body.trainingType;
    training.trainingDescription = req.body.trainingDescription;
    training.capacity = req.body.capacity;
    training.topicsCovered = req.body.topicsCovered;

    await training.save();
    res.json(training);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

export default router;
