const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');

// Express
const app = express();

// Mongoose
// const { MONGODB_URI } = process.env;
// if (MONGODB_URI) {
//   mongoose.connect(MONGODB_URI);
// } else {
//   mongoose.connect('mongodb://localhost/newsdb', { useNewUrlParser: true });
// }

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdb";
mongoose.connect(MONGODB_URI);

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