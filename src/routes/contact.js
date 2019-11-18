const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../config/upload");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gomycode.project@gmail.com",
    pass: "0123azeRTY"
  }
});

// Load Validation
const validateContactInput = require("../validation/contact");

//Load Models
const Contact = require("../models/Contact");

// @route   GET api/contact/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "contacts Works" }));

// @route   GET api/contact/all
// @desc    Get all contact
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Contact.find()
      .then(contact => {
        if (!contact) {
          errors.nocontact = "There are no contacts";
          res.status(404).json(errors);
        }
        res.json(contact);
      })
      .catch(err => res.status(404).json({ contact: "There are no contacts" }));
  }
);

// @route   GET api/contact/:id
// @desc    Get contact by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contact.findOne({ _id: req.params.id })
      .then(contact => {
        res.json(contact);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/contact/create
// @desc    Create new contact
// @access  Public
router.post("/create", (req, res) => {
  const { errors, isValid } = validateContactInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // GEt fields
  const contactFields = {};
  if (req.body.contain) contactFields.contain = req.body.contain;
  if (req.body.subject) contactFields.subject = req.body.subject;
  if (req.body.email) contactFields.email = req.body.email;
  if (req.body.name) contactFields.name = req.body.name;

  var mailOptions = {
    from: "gomycode.project@gmail.com",
    to: "selma.belkhodja@gmail.com",
    subject: "subject",
    text: `bonjour ${contactFields.email} ${contactFields.subject} ${
      contactFields.contain
    }`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  new Contact(contactFields).save().then(contact => res.json(contact));
});

// @route   DELETE api/contact/id
// @desc    Delete contact
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contact.findOneAndRemove({ _id: req.params.id }).then(
      res.json({ Success: true })
    );
  }
);

module.exports = router;
