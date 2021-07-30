const express = require('express');
const cors = require('cors');
const db = require('./db/index');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Get all urls

app.get('/api/shortid', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM urls');
    res.status(200).json({
      status: 'Success',
      results: result.rows.length,
      data: {
        urls: result.rows
      }
    });
  } catch (err) {
    console.error(err);
  }
});

//Create a url
app.post('/api/shortid', async (req, res) => {
  try {
    const result = await db.query(
      'INSERT INTO urls (fullUrl, shortUrl) VALUES ($1, $2) RETURNING *',
      [req.body.fullUrl, req.body.shortUrl]
    );
    res.status(201).json({
      status: 'success',
      data: {
        url: result.rows[0]
      }
    });
  } catch (err) {
    console.error(err);
  }
});

//Delete a url
app.delete('/api/shortid/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM urls WHERE id = $1', [
      req.params.id
    ]);
    res.status(204).json({
      status: 'Success'
    });
  } catch (err) {
    console.error(err);
  }
});

//Redirect
// app.get('/:shortid', (req, res) => {
//   // const link = await db.query('SELECT fullurl FROM urls WHERE shorturl = $1', [
//   //   req.params.shortid
//   // ]);
//   // if (link == null) return res.sendStatus(404);
//   // res.redirect(link);
//   console.log(req.params.shortid);
// });

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
