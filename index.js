import express from 'express';

const server = express();
const port = 3000;

server.get(/\/(health)?/, (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

server.get('memegen', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
