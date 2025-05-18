import express from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import config from "config";
import auth from "../middleware/auth.js";
import crypto from "crypto"; // to create verify token 


const router = express.Router();

/*
get the request body
validate the request body
check if the user already exists , yes --> error // no --> create the user
Encrypt the password
save data in DB
using JWT send back the response --> user id 
*/

/*
Path : POST /api/users/register
Desc : Register a new user
Public
*/

router.post(
  "/register",
  check("firstName", "First name is required").notEmpty(),
  check("lastName", "Last name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("location", "Location is required").notEmpty(),
  check("dateOfBirth", "Date of birth is required").notEmpty(),
  check("mobileNumber", "Mobile number is required").notEmpty(),
  check("mobileNumber", "Mobile number must be numeric").isNumeric(),
  check("mobileNumber", "Mobile number must be at least 10 digits").isLength({
    min: 10,
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstName,
      lastName,
      email,
      location,
      dateOfBirth,
      mobileNumber,
      password,
      role,
    } = req.body;

    try {
      const { email } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ param: "email", msg: "Email already exists" }] });
      }
      // email verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");
      
      user = new User({
        firstName,
        lastName,
        email,
        location,
        dateOfBirth,
        mobileNumber,
        password,
        dateOfcreation: Date.now(),
        role,
        emailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: Date.now() + 3600000,
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const verificationLink = `http://localhost:5000/verify/${verificationToken}`;
      console.log("email Verification Link:", verificationLink);

      res.status(201).json({ message: "User registered. Please check your email to verify your account." });
      // const payload = {
      //   user: {
      //     id: user.id,
      //     role: user.role,
      //   },
      // };
      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   { expiresIn: "5days" },
      //   (err, token) => {
      //     if (err) {
      //       throw err;
      //     } else {
      //       res.json({ token });
      //     }
      //   }
      // );
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }
);


/*
path -->  GET /api/users/verify/:token
desc --> verify user email using the token
public * 
*/

router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      emailVerificationToken: req.params.token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5days" },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Token generation failed.");
        }

      }
    );
  
    res.json({ message: "Email successfully verified!", token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


/*
Path : POST /api/users/login
Desc : Login a user
Public
*/

router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be strong").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  ),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password  } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "5days" },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }
);

/*
Path : GET /api/users
Desc : Takes a Token and returns the user information
Private
*/

router.get("/", auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id).select("-password");
    res.send(foundUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

export default router;
