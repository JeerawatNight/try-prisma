const prisma = require("../../prismaClient");

// Create a new profile for a user
const createProfile = async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;

  try {
    const profile = await prisma.profile.create({
      data: {
        bio,
        userId: parseInt(userId),
      },
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single profile by ID
const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: parseInt(id) },
    });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a profile by ID
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;
  try {
    const profile = await prisma.profile.update({
      where: { id: parseInt(id) },
      data: { bio },
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a profile by ID
const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.profile.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
