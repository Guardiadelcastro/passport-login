const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => res.render('welcome'));

// router.get('/signup', (req, res, next) => {
//   res.render('signup.ejs');
// });

// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/profile',
//   failureRedirect: '/signup',
//   passReqToCallback: true
// }));

// router.get('/login', (req, res, next) => {
//   res.render('login.ejs');
// });

// router.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   passReqToCallback: true
// }));

// router.get('/logout', (req, res, next) => {
//   req.logout();
//   res.redirect('/');
// });

// router.get('/profile', isAuthenticated, (req, res, next) => {
//   res.render('profile.ejs')
// });

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/');
// };
//   }
//   res.redirect('/');
// };
//   }
//   res.redirect('/');
// };

module.exports = router;
