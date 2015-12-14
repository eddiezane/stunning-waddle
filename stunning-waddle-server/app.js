import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

const app = express();

/*
 * {
 *   "ahgsakhga": 0
 * }
 */

const db = {};

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello, World');
})

/*
 * Request will have Gif ID
 */

app.get('/api/score', (req, res) => {
  let id = req.query.id;

  res.send({id, score: db[id]});
})

app.post('/api/upvote', (req, res) => {
  let id = req.body.id

  if (db[id]) {
    db[id]++;
  } else {
    db[id] = 1;
  }

  res.send({ id, score: db[id] });
})

app.post('/api/downvote', (req, res) => {
  let id = req.body.id

  if (db[id]) {
    db[id]--;
  } else {
    db[id] = -1;
  }

  res.send({ id, score: db[id] });
})

app.listen(3000);
