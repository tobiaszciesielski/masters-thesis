import { Router } from 'express';
const usersRouter = Router();

usersRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('bad request');
  }

  res.status(200).send({ email, password });
});

export { usersRouter };
