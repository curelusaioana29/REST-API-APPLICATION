import app from './app.mjs';
import connectDB from './db.mjs';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running. Use our API on port: ${port}`);
  });
});
