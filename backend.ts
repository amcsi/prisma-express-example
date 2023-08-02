import express from 'express';

// Create an Express app
const app = express();

app.use(express.json());

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/users', (req, res) => {
  console.log(req.body);

  res.send('');
});

// Set up the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
