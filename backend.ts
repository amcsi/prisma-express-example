import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create an Express app
const app = express();

app.use(express.json());

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/users', async (req, res) => {
  const body = req.body;
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  })

  res.json(user);
});

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany()

  res.json(users);
});

// Set up the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
