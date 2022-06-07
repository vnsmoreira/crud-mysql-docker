const express = require('express');
const cors = require('cors');
const routes = require('./app/routes/index.routes');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 2121;

(async () => {
  await db.connect();

  routes(app);
  
  app.listen(PORT, () => {
    console.info(`Running on: http://localhost:${PORT}`);
  });
})();
