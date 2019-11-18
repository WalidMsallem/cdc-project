const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gomycode.project@gmail.com",
    pass: "0123azeRTY"
  }
});

//Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//Load Student Model
const Admin = require("../models/Admin");

// @route   POST api/users/register
// @desc    Admin
// @access  Public

// router.post("/register", (req, res) => {
//   const { errors, isValid } = validateRegisterInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   Admin.findOne({ email: req.body.email }).then(admin => {
//     if (admin) {
//       errors.email = "Email already exist";
//       return res.status(400).json(errors);
//     } else {
//       const newAdmin = new Admin({
//         email: req.body.email,
//         password: req.body.password
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newAdmin.password, salt, (err, hash) => {
//           if (err) throw err;
//           newAdmin.password = hash;
//           newAdmin
//             .save()
//             .then(admin => res.json(admin))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

// @route   POST api/users/login
// @desc    Login admin / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  Admin.findOne({ email }).then(admin => {
    // Check for user
    if (!admin) {
      errors.email = "Admin not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        // admin Matched

        const payload = {
          id: admin.id,
          email: admin.email
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 43200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
