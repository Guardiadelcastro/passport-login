// Modules
import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as session from 'express-session';
import * as flash from 'connect-flash';

import keys from './config/keys';
import * as router from './routes/router';
import * as users from './routes/users';
import './config/passport';

class Server {

  app: express.Application

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    // Mongoose connect
    const MONGO_URI = keys.mongodb.URI;
    const mongooseOptions = {
      autoIndex: false, // Don't build indexes
      reconnectTries: 10, // Retry up to 10 times
      reconnectInterval: 1000, // Reconnect every 1s
      bufferMaxEntries: 0,
      useNewUrlParser: true
    };
    mongoose.connect(MONGO_URI || process.env.MONGODB_URL, mongooseOptions)
      .then(() => console.log(`MongoDB is connected...`))
      .catch(err => console.error(`MongoDB connection unsccessfull due to error: ${err}`));

    // Settings
    this.app.set('port', process.env.PORT || 5000);
    // middlewares
    this.app.use(session({ secret: 'secret', resave: true, saveUninitialized: true}));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(morgan('dev'));
    this.app.use(flash());

    // Global variables
    this.app.use((req:any, res, next) => {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      next();
    });

    // Set view engine: Pug
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug')

  }

  routes() {
    this.app.use('/', router);
    this.app.use('/users', users);

  }

  start() {
    this.app.listen(this.app.get('port'), () => console.log(`Listening on port ${this.app.get('port')}`));

  }

}

const server = new Server();
server.start();
