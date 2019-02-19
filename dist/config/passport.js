"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const bcrypt = require("bcryptjs");
// Load User model
const User = require("../models/User");
module.exports = function (passport) {
    passport.use(new passport_local_1.Strategy({ usernameField: 'email' }, (email, password, done) => {
        // Match user
        User.findOne({ email })
            .then(user => {
            if (!user) {
                return done(null, false, { message: 'That email is not registered' });
            }
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err)
                    throw err;
                if (isMatch) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            });
        })
            .catch(err => console.error(err));
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
//# sourceMappingURL=passport.js.map