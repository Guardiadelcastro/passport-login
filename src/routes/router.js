const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.ejs')
});

router.get('/signup', (req, res, next) => {
  res.render('signup.ejs');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
}));

router.get('/login', (req, res, next) => {
  res.render('login.ejs');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  passReqToCallback: true
}));

router.get('/profile', (req, res, next) => {
  res.render('profile.ejs')
})
module.exports = router;
