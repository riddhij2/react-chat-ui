const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const socketInit = require('./socket');
const messageRoutes = require('./routes/message');
const pool = require('./util/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/auth', authRoutes);
app.use('/message', messageRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

const ports = process.env.PORT || 5000;
const server = app.listen(ports, () => console.log(`Listening on port ${ports}`));

socketInit(server);
