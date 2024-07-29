const prisma = require("../../prismaClient");

// Create a new post for a user
const createPost = async (req, res) => {
  const { userId } = req.params;
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: parseInt(userId),
      },
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send("Deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
