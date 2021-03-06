const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');

// Express
const app = express();

// Mongoose
const { MONGODB_URI } = process.env;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI);
} else {
  mongoose.connect('mongodb://user1:password1@ds151416.mlab.com:51416/heroku_xz8t50jd', { useNewUrlParser: true });
}

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Errors
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;