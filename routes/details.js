const {Router} = require('express');

const details = Router();

details.get('/', (req, res) => {
  res.send(200);
});

details.get('/login', (req, res) => {
  res.json({route: 'POST'});
});

module.exports = details;
