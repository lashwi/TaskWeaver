import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // Check if user is logged in
  if (req.session?.user) {
    res.send(req.session.user);
  } else {
    res.status(401).send('Unauthorized');
  }
});
