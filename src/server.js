const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan'); 

const app = express();
require('./database')
//config
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view-engine', 'ejs');
app.set('port', port);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
const routes = require('./routes/router');
app.use('/', routes);

// server init
app.listen(app.get('port'), () => console.log(`Listening on port ${port}`));