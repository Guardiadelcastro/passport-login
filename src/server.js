const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan'); 
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash'); 

const app = express();
require('./database');
require('./passport/local-auth');
//config
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view-engine', 'ejs');
app.set('port', port);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mySecretSession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  app.locals.signUpMessage = req.flash('signUpMessage');
  app.locals.logInMessage = req.flash('logInMessage');
  app.locals.user = req.user;
  next();
})
// routes
const routes = require('./routes/router');
app.use('/', routes);

// server init
app.listen(app.get('port'), () => console.log(`Listening on port ${port}`));