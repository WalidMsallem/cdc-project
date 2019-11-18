const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../config/upload");

// Load Validation
const validateCollaboraterInput = require("../validation/collaborater");

//Load Models
const Collaborater = require("../models/Collaborater");

// @route   GET api/collaborater/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "collaborater Works" }));

// @route   GET api/collaborater/all
// @desc    Get all collaborater
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Collaborater.find()
    .then(collaborater => {
      if (!collaborater) {
        errors.nocollaborater = "There are no collaboraters";
        res.status(404).json(errors);
      }
      res.json(collaborater);
    })
    .catch(err =>
      res.status(404).json({ collaborater: "There are no collaboraters" })
    );
});

// @route   GET api/collaborater/:id
// @desc    Get collaborater by id
// @access  Public
router.get("/:id", (req, res) => {
  Collaborater.findOne({ _id: req.params.id })
    .then(collaborater => {
      res.json(collaborater);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/collaborater/create
// @desc    Create new collaborater
// @access  Private
router.post(
  "/create",
  upload.single("photo"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCollaboraterInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // GEt fields
    const collaboraterFields = {};
    if (req.body.name) collaboraterFields.name = req.body.name;
    if (req.body.country) collaboraterFields.country = req.body.country;
    if (req.body.chief) collaboraterFields.chief = req.body.chief;
    if (req.body.bio) collaboraterFields.bio = req.body.bio;
    if (req.file) collaboraterFields.photo = req.file.path;

    new Collaborater(collaboraterFields)
      .save()
      .then(collaborater => res.json(collaborater));
  }
);

// @route   Put api/collaborater/update/:id
// @desc    Update collaborater
// @access  Private
router.put(
  "/update/:id",
  upload.single("photo"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCollaboraterInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // GEt fields
    const collaboraterFields = {};
    if (req.body.name) collaboraterFields.name = req.body.name;
    if (req.body.country) collaboraterFields.country = req.body.country;
    if (req.body.chief) collaboraterFields.chief = req.body.chief;
    if (req.body.bio) collaboraterFields.bio = req.body.bio;
    if (req.file) collaboraterFields.photo = req.file.path;

    Collaborater.findOneAndUpdate(
      { _id: req.params.id },
      { $set: collaboraterFields },
      { new: true }
    )
      .then(collaborater => res.json(collaborater))
      .catch(err => res.status(404).json({ Update: failed }));
  }
);

// @route   DELETE api/Collaborater/id
// @desc    Delete Collaborater
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Collaborater.findOneAndRemove({ _id: req.params.id }).then(
      res.json({ Success: true })
    );
  }
);

module.exports = router;
