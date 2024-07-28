const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Create User
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    // const isExist = //sql server when you query at the table must be escaped with []
    //   await prisma.$queryRaw`SELECT * FROM [User] WHERE email = ${email}`;
    // console.log({ isExist });
    // if (isExist.length > 0) {
    //   throw new Error("User with this email and name already exists");
    // }

    const isExist = await prisma.user.findUnique({
      where: { email },
    });
    if (isExist) {
      throw new Error("User with this email and name already exists");
    }

    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Read All Users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Read User by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
});

// Update User by ID
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User not found or invalid data" });
  }
});

// Delete User by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({ where: { id: Number(id) } });
    res.json(user);
  } catch (error) {
    console.dir(error);
    res.status(400).json({ error: "User not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
