const app = require('./app');
const connectDB = require('./db');
const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running. Use our API on port: ${port}`);
  });
});
