import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data.json');

const app = express();
app.use(cors());
app.use(express.json());

const readData = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

app.get('/api/events', (req, res) => {
  const data = readData();
  res.json(data.events);
});

app.post('/api/events', (req, res) => {
  const data = readData();
  const newEvent = {
    ...(req.body || {}),
    id: Date.now(),
    joined: 0,
    total: parseInt(req.body.total) || 50,
    adminOwned: true
  };
  data.events.push(newEvent);
  writeData(data);
  res.status(201).json(newEvent);
});

app.get('/api/leaderboard', (req, res) => {
  const data = readData();
  res.json(data.leaderboard);
});

app.delete('/api/events/:id', (req, res) => {
  const data = readData();
  const idToRemove = parseInt(req.params.id, 10);
  data.events = data.events.filter(e => e.id !== idToRemove);
  writeData(data);
  res.status(200).json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body || {};
  
  if (role === 'admin' && email === 'admin@goodhood.com' && password === 'admin') {
    res.json({ token: `mock-jwt-admin`, role: 'admin' });
  } else if (role === 'participant' && email === 'user@goodhood.com' && password === 'user') {
    res.json({ token: `mock-jwt-participant`, role: 'participant' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
