const express = require('express');
const app = express();
const todos = require('./src/data/todos');
const cors = require('cors');

app.use(cors());

app.get('/api/todos', (req, res) => {
  console.log(req.headers.authorization);
  return res.json({
    success: true,
    todos,
  });
});

const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
