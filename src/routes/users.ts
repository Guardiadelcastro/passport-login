import * as express from 'express';
import * as passport from 'passport';
import { checkRegisterErrors } from '../controllers/users.controller'


const router = express.Router();

// Model
import User from '../models/User';

// Login
router.get('/login', (req, res) =>  res.render('login'));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
});
// Register
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const userParams = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2
  }

  const errors = await checkRegisterErrors(userParams);

  if(errors.length > 0) {
    res.render('register', {
      userParams,
      errors
    });
  }

  const newUser = new User({
    name: userParams.name,
    email: userParams.email,
    password: userParams.password
  })

  newUser.save();
  res.redirect('/users/login');

});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

export default router;
