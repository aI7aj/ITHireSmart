
import {check} from "express-validator";

 export const registerValidator=[
  check("firstName")
  .notEmpty().withMessage("First name is required")
  .bail()
  .isLength( {min:4,max:15, }).withMessage("First name must be between 4 and 15 characters"),

  check("lastName")
  .notEmpty().withMessage("Last name is required")
  .bail()
  .isLength({ min:4,max:15,}).withMessage("Last name must be between 4 and 15 characters"),

  check("password")
  .notEmpty()
  .bail()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/).withMessage("Password must be at least 8 characters and include uppercase, lowercase, number, and symbol"),


  ,check("email", "Please include a valid email").isEmail().isLength({
    min:10,
    max:50,
  }),
  check("location", "Location is required").notEmpty(),
  check("dateOfBirth", "Date of birth is required").notEmpty(),
  check("mobileNumber")
  .notEmpty().withMessage( "Mobile number is required")
  .bail()
  .isNumeric().withMessage( "Mobile number must be numeric")
  .isLength({ min: 10, max:15, }).withMessage("Mobile number must be between 10 and 15 digits"),
];
