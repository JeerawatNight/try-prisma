const express = require("express");
const {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const router = express.Router();

router.post("/:userId/profile", createProfile);
router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
