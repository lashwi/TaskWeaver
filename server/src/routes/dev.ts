import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/addNewUser', (req, res) => {
  // Find the next available user ID
  prisma.user.findMany({
    orderBy: {
      id: 'desc',
    },
  }).then((users) => {
    const nextId = users[0].id + 1;
    // Create a new user
    prisma.user.create({
      data: {
        email: `test+${nextId}@example.com`
      },
    }).then((user) => {
      res.send(user);
    });
  });
});

router.get('/addNewBoard', (req, res) => {
  // Find the latest user ID and next board ID
  prisma.user.findMany({
    orderBy: {
      id: 'desc',
    },
  }).then((users) => {
    const currUserId = users[0].id;
    prisma.board.findMany({
      orderBy: {
        id: 'desc',
      },
    }).then((boards) => {
      const nextBoardId = boards[0].id + 1;
      // Create a new board
      prisma.board.create({
        data: {
          trelloBoardId: "0",
          name: 'New Board',
          owner: {
            connect: {
              id: currUserId,
            },
          },
        },
      }).then((board) => {
        res.send(board);
      });
    });
  });
});

router.get('/addNewTasks', (req, res) => {
  // Find the latest board ID
  prisma.board.findMany({
    orderBy: {
      id: 'desc',
    },
  }).then((boards) => {
    const currBoardId = boards[0].id;
    // Create a new task
    prisma.task.create({
      data: {
        trelloCardId: "0",
        trelloBoardId: "0",
        title: 'A task',
        board: {
          connect: {
            id: currBoardId,
          },
        },
        color: "#fc0000"
      },
    }).then((task) => {
      res.send(task);
    });
  });
});

export default router;
