import express from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import config from "config";
import auth from "../middleware/auth.js";

import {registerValidator} from "../middleware/registervalidate.js"
import validaterror from "../middleware/validationresult.js";

const router = express.Router();

/********************************** 
get the request body
validate the request body
check if the user already exists , yes --> error // no --> create the user
Encrypt the password
save data in DB
using JWT send back the response --> user id 


@Desc : Register a new user
@router : POST /api/users/register
@access public
@method POST
*************************************/

router.post(
  "/register",
  registerValidator
  ,validaterror
  ,async (req, res) => {
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
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ param: "email", msg: "Email already exists" }] });
      }

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
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
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
Path : 
Desc : Login a user
Public

@desc : Register a new user
@router : POST /api/users/login
@access public
@method POST
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
    const { email, password } = req.body;

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
            res.json({
              token,
              id: user.id,
              email: user.email,
              role: user.role,
              firstName: user.firstName,
              lastName: user.lastName,
            });
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
