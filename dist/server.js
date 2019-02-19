"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://mongo:27017/passport-login';
        const mongooseOptions = {
            autoIndex: false,
            reconnectTries: 10,
            reconnectInterval: 1000,
            bufferMaxEntries: 0,
            useNewUrlParser: true
        };
        mongoose.connect(db, dbOptions)
            .then(() => console.log(`MongoDB is connected...`))
            .catch(err => console.error(`MongoDB connection unsccessfull due to error: ${err}`));
    }
    routes() {
    }
    start() {
    }
}
// Files
// import * as router from './routes/router'
// import * as users from './routes/users';
// import * as keys from './config/keys';
// Initialize express
const app = express();
// Passport config
require('./config/passport')(passport);
// Connect to mongo
const dbOptions = {
    autoIndex: false,
    reconnectTries: 10,
    reconnectInterval: 1000,
    bufferMaxEntries: 0,
    useNewUrlParser: true
};
mongoose.connect(db, dbOptions)
    .then(() => console.log(`MongoDB is connected...`))
    .catch(err => console.error(`MongoDB connection unsccessfull due to error: ${err}`));
// Bodyparser
app.use(express.urlencoded({ extended: false }));
// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());
// Connect Flash
app.use(flash());
// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
// Morgan
app.use(morgan('dev'));
// Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// routes
app.use('/router', router);
app.use('/users', users);
// server init
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
//# sourceMappingURL=server.js.map