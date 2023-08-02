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

  res.json({
    data: user,
  });
});

app.get('/api/users', async (req, res) => {
  const limit = Number(req.query.limit) ?? 10;
  const page = Number(req.query.page) ?? 1;
  const offset = (page - 1) * limit;

  const total = await prisma.user.count();

  const users = await prisma.user.findMany({
    skip: offset,
    take: limit,
  })

  res.json({
    data: users,
    pagination: {
      total,
      total_pages: Math.ceil(total / limit),
      current_page: page,
      limit,
    }
  });
});

app.get('/api/users/:id', async (req, res) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: Number(req.params.id),
    }
  })

  res.json({
    data: user,
  });
});

// Set up the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
