import cors from 'cors';
import express from 'express';
import { apiRouter } from './routes/api';
import morgan from 'morgan';
import { PORT } from '../config';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
