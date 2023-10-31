import express from 'express';
import config from './config.js';

const port = config.PORT;
const app = express();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
