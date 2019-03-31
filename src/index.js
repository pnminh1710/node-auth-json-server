import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import lowdb from 'lowdb';

import FileSync from 'lowdb/adapters/FileSync';

import errorHandler from './helpers/errorHandler';

import usersRouter from './users';

const app = express();

const adapter = new FileSync('db.json');
const db = lowdb(adapter);

db.defaults({ user: {} }).write();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', usersRouter);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
