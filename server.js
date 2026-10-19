const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory storage
let tasks = [
  { id: 1, title: 'Finish Express lab', description: 'Deploy to Render', completed: false }
];
let nextId = 2;

// Validation helper
function validateTask(body, requireTitle = true) {
  const errors = [];
  if (requireTitle && (typeof body.title !== 'string' || body.title.trim() === '')) {
    errors.push('title is required and must be a non-empty string');
  }
  if (body.description !== undefined && typeof body.description !== 'string') {
    errors.push('description must be a string');
  }
  if (body.completed !== undefined && typeof body.completed !== 'boolean') {
    errors.push('completed must be true or false');
  }
  return errors;
}

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Task API is running' });
});

// READ all
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// READ one
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json(task);
});

// CREATE
app.post('/api/tasks', (req, res) => {
  const errors = validateTask(req.body || {});
  if (errors.length > 0) return res.status(400).json({ errors });

  const newTask = {
    id: nextId++,
    title: req.body.title.trim(),
    description: req.body.description || '',
    completed: req.body.completed || false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE (PUT)
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const errors = validateTask(req.body || {});
  if (errors.length > 0) return res.status(400).json({ errors });

  task.title = req.body.title.trim();
  task.description = req.body.description !== undefined ? req.body.description : task.description;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  res.status(200).json(task);
});

// DELETE
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const deleted = tasks.splice(index, 1)[0];
  res.status(200).json({ message: 'Task deleted successfully', task: deleted });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});