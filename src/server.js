const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash'); 

const app = express();

// Passport config
require('./config/passport')(passport);
// DB config
const db = require('./config/keys').mongodb.URI

// Connect to mongo
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 10, // Retry up to 10 times
  reconnectInterval: 1000, // Reconnect every 1s
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect(db, options)
    .then(() => {
    console.log('MongoDB is connected...')
    })
    .catch( err => {
    console.error(`MongoDB connection unsuccessful due to error: ${err}, retrying in 5 seconds`)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()  
// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
); 

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
})

// Morgan
app.use(morgan('dev'));

// Pug
// app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// routes
app.use('/', require('./routes/router.js'));
app.use('/users', require('./routes/users.js'));

// server init
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Listening on port ${PORT}`));