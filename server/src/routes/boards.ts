import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  prisma.board.findUnique({
    where: {
      id: Number(req.params.id),
    },
  }).then((board) => {
    res.send(board);
  });
});

export default router;
