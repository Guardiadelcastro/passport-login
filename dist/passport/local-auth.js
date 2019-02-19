var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.findById(id);
    done(null, user);
}));
passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.findOne({ 'email': email });
    if (user) {
        return done(null, false, req.flash('signUpMessage', 'Email already exists'));
    }
    else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        yield newUser.save();
        done(null, newUser);
    }
})));
passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.findOne({ 'email': email });
    if (!user) {
        return done(null, false, req.flash('logInMessage', 'User not found'));
    }
    else if (!user.comparePassword(password)) {
        return done(null, false, req.flash('logInMessage', 'Incorrect password'));
    }
    return done(null, user);
})));
//# sourceMappingURL=local-auth.js.map