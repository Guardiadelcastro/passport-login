import * as passportLocal from 'passport-local';
import * as passport from 'passport';
import * as bcrypt from 'bcrypt'

// Load User model
import User from '../models/User';

const LocalStrategy = passportLocal.Strategy

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});


passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user);
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match user
    User.findOne({ email })
      .then((user) => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log(password);
        console.log(user.password);
        if (err) {throw err};
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    })
    .catch(err => console.error(err));
  })
);
