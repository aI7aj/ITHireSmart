import express from "express";
import auth from "../middleware/auth.js";
import { check, validationResult } from "express-validator";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import upload from "../utils/index.js";
import { request } from "http";
import {validateobjectid} from "../middleware/validateobjectid.js";

const router = express.Router();

/*
1- POST/profiles --> create , update
2- GET/profiles/me --> curent user
3- GET/profiles --> all profiles
4- GET/profiles/user/:userId --> specif user
5- DELETE/profiles/ --> delete user , profile and posts
6- POST/Profiles/upload --> upload profile pic
7- PUT/Profiles/experience --> add experience
8- DELETE/Profiles/experience/:expId --> delete experience
9- PUT/Profiles/education --> add education
10- DELETE/Profiles/education/:eduId --> delete education
*/

/*
* Create or update profile
*/

router.post(
  "/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      const { company, location, status, skills, bio, experience, education } =
        req.body;

      const profileFields = {
        user: req.user.id,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(",").map((skill) => skill.trim()),
        company,
        location,
        status,
        bio,
        experience,
        education,
      };
      try {
        let profileObject = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        return res.json(profileObject);
      } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
      }
    }
  }
);

// uploud photo 

async function uploudphoto (newphoto){
try {
  const {data}=await request.post('/profile-photo-uploud',newphoto);

} catch (error) {
  
}


}


router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["firstName", "lastName"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    } else {
      res.json(profile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});


// return all users profile
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "firstName",
      "lastName",
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.get("/user/:userId", auth,validateobjectid, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate(
      "user",
      ["firstName lastName"]
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for the given user" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.delete("/", auth, async (req, res) => {
  //Remove POST , profile , user
  try {
    await Promise.all([
      // TODO : include deleting posts
      Profile.findOneAndDelete({ user: req.user.id }),
      User.findOneAndDelete({ user: req.user.id }),
    ]);
    res.json({ msg: "User information deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

//TODO : Make a Test when u make the front 
router.post("/upload",auth, async (req, res) => {
  try {
    upload(req , res ,async (err)=>{
      if(err){
        res.status(500).send(`Server Error : ${err}`);
      }else{
        res.status(200).send(req.uesr.id)
      }
    })    
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
})

router.put("/experience", 
  auth ,
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required and needs to be from the past").notEmpty()
  .custom((value , {req})=>{
    if (new Date(value) > new Date()) {
      throw new Error("From date must be in the past");
    }
    return true;
  }),
   async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()})
    }
    try {
      const profile = await Profile.findOne({user:req.user.id});
      profile.experience.unshift(req.body);
      await profile.save();
      return res.json(profile);

    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
})

router.delete("/experience/:expId", auth,validateobjectid, async (req, res) => {
  try{
    const profile = await Profile.findOne({user:req.user.id});
    profile.experience = profile.experience.filter( exp => {
      return exp._id.toString() !== req.params.expId
    });
    await profile.save();
    return res.json(profile)
  }catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

router.put("/education", 
  auth ,
  check("school", "school is required").notEmpty(),
  check("degree", "degree is required").notEmpty(),
  check("fieldofstudy", "fieldofstudy is required").notEmpty(),
  check("from", "From date is required and needs to be from the past").notEmpty()
  .custom((value , {req})=>{
    if (new Date(value) > new Date()) {
      throw new Error("From date must be in the past");
    }
    return true;
  }),
   async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()})
    }
    try {
      const profile = await Profile.findOne({user:req.user.id});
      profile.education.unshift(req.body);
      await profile.save();
      return res.json(profile);

    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
})

router.delete("/education/:eduId", auth,validateobjectid, async (req, res) => {
  try{
    const profile = await Profile.findOne({user:req.user.id});
    profile.education = profile.education.filter( edu => {
      return edu._id.toString() !== req.params.eduId
    });
    await profile.save();
    return res.json(profile)
  }catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});



export default router;
