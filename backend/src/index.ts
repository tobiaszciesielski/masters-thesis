import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import { usersRouter } from './api/users';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
