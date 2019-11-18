const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../config/upload");

// Load Validation
const validateProjectInput = require("../validation/project");

//Load Models
const Project = require("../models/Project");

// @route   GET api/project/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Project Works" }));

// @route   GET api/project/all
// @desc    Get all project
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Project.find()
    .then(project => {
      if (!project) {
        errors.noproject = "There are no projects";
        res.status(404).json(errors);
      }
      res.json(project);
    })
    .catch(err => res.status(404).json({ project: "There are no projects" }));
});

// @route   GET api/project/:id
// @desc    Get project by id
// @access  Public
router.get("/:id", (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then(project => {
      res.json(project);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/project/create
// @desc    Create new project
// @access  Private
router.post(
  "/create",
  upload.single("document"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // GEt fields
    const projectFields = {};
    if (req.body.title) projectFields.title = req.body.title;
    if (req.body.country) projectFields.country = req.body.country;
    if (req.body.email) projectFields.email = req.body.email;
    if (req.body.organizer) projectFields.organizer = req.body.organizer;
    if (req.body.thematic) projectFields.thematic = req.body.thematic;
    if (req.body.validEmail) projectFields.validEmail = req.body.validEmail;
    if (req.body.description) projectFields.description = req.body.description;
    if (req.file) projectFields.document = req.file.path;

    new Project(projectFields).save().then(project => res.json(project));
  }
);

// @route   Put api/project/update/:id
// @desc    Update company offre
// @access  Private
router.put(
  "/update/:id",
  upload.single("document"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // GEt fields
    const projectFields = {};
    if (req.body.title) projectFields.title = req.body.title;
    if (req.body.country) projectFields.country = req.body.country;
    if (req.body.email) projectFields.email = req.body.email;
    if (req.body.organizer) projectFields.organizer = req.body.organizer;
    if (req.body.thematic) projectFields.thematic = req.body.thematic;
    if (req.body.validEmail) projectFields.validEmail = req.body.validEmail;
    if (req.body.description) projectFields.description = req.body.description;
    if (req.body.document) projectFields.document = req.body.document;
    if (req.file) projectFields.document = req.file.path;

    Project.findOneAndUpdate(
      { _id: req.params.id },
      { $set: projectFields },
      { new: true }
    )
      .then(project => res.json(project))
      .catch(err => res.status(404).json({ Update: failed }));
  }
);

// @route   DELETE api/project/id
// @desc    Delete project
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findOneAndRemove({ _id: req.params.id }).then(
      res.json({ Success: true })
    );
  }
);

module.exports = router;
