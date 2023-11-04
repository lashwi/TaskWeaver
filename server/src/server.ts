import express from 'express';
import config from './config.js';

import boardsRouter from './routes/boards.js';
import devRouter from './routes/dev.js';

const port = config.PORT;
const app = express();

// TODO: Add authentication middleware
app.use('/api/v0/boards', boardsRouter);

// TODO: Remove
app.use('/dev', devRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
