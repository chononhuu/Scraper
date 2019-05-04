const Article = require('../models/Article');

module.exports = {
  display(req, res) {
    Article.find({})
      .then(dbArticle => {
        res.render('articles', { article: dbArticle });
      })
      .catch(err => res.json(err));
  },
};