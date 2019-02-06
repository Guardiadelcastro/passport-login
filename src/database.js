const mongoose = require('mongoose');
const { mongodb } = require('./keys')
mongoose.connect(mongodb.URI, {})
  .then(db => console.log('database is connected'))
  .catch(err => console.error(err))