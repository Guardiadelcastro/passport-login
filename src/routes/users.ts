import * as express from 'express';
import * as passport from 'passport';
import * as bcrypt from 'bcryptjs';

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
  try {
    const { name, email, password, password2 } = req.body;
    const errors = [];

    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (password !== password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('register', { errors, name, email, password, password2 });
      return;
    }

    let user = await User.findOne({ email })
    if(user) {
      res.render('register', { errors, name, email, password, password2});
      return;
    }

    user = new User({ name, email, password})
    await user.save()
    req.flash(
      'success_msg',
      'You are now registered and can log in'
    );
    res.redirect('/users/login');

  } catch (err) {
    console.log(err)
  }
})

// Logout
router.get('/logout', (req:any, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

export = router;
