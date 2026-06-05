const app = require('./app');
const dotenv = require('dotenv');
const { connectDatabase } = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend API listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Server startup failed:', error);
    process.exit(1);
  });
