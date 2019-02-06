const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) =>  {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) =>  {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = await User.findOne({email: email});

  if(user) {
    return done(null, false, req.flash('signUpMessage', 'Email already exists'));
  } else {
    const newUser = new User();
    
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});

  if (!user) {
    return done(null, false, req.flash('logInMessage', 'User not found'))
  }
  if (!user.comparePassword(password)) {
    return done(null, false, req.flash('logInMessage', 'Incorrect password'))
  }
  done(null, user)

}))