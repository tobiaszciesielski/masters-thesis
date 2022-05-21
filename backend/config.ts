import dotenv from 'dotenv';
dotenv.config();

if (!process.env.TOKEN_SECRET) {
  console.log('Please setup all environment variables');
  process.exit(1);
}

export const { TOKEN_SECRET } = process.env;

export const PORT = 4000;
