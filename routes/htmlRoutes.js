const Article = require('../models/Article');

module.exports = app => {
  // Index page
  app.get('/', (req, res) => {
    Article.find({}).then(dbArticle =>
      res.render('index', { data: dbArticle })
    );
  });
  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.render('404');
  });
};