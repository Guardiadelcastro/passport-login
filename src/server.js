const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// const flash = require('connect-flash'); 

const app = express();

// DB config
const db = require('./config/keys').mongodb.URI

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Morgan
app.use(morgan('dev'));

// EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/router.js'));
app.use('/users', require('./routes/users.js'));

// server init
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Listening on port ${PORT}`));