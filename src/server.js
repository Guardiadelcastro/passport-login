const express = require('express');
const engine = require('ejs-mate');
const path = require('path');

const app = express();

//config
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view-engine', 'ejs');
app.set('port', port);

// routes
const routes = require('./routes/router');
app.use('/', routes);

// server init
app.listen(app.get('port'), () => console.log(`Listening on port ${port}`));