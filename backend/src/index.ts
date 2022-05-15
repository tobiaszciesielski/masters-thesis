import cors from 'cors';
import express from 'express';
import { apiRouter } from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
