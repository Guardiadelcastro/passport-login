const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.ejs')
});

router.get('/signup', (req, res, next) => {
  
});

router.post('/signup', (req, res, next) => {

});

router.get('/login', (req, res, next) => {
  
});

router.post('/login', (req, res, next) => {

});

module.exports = router;
