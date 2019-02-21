import * as express from 'express';
import * as passport from 'passport';
import { checkRegisterErrors } from '../controllers/users.controller'


const router = express.Router();

// Model
import User, { UserModel } from '../models/User';
import '../config/passport';

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
  const { name, email, password, password2 } = req.body
  const errors = await checkRegisterErrors( name, email, password, password2 );

  if(errors.length > 0) {
    res.render('register', {
      name,
      email,
      password,
      password2,
      errors
    });
  }

  const newUser = new User({
    name,
    email,
    password
  })

  newUser.save();
  res.redirect('/users/login');

});

// Logout
router.get('/logout', (req:any, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

export = router;
