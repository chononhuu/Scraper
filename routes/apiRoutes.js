const ScrapeController = require('../controllers/scrape_controller');
const ArticleController = require('../controllers/articles_controller');
const NoteController = require('../controllers/notes_controller');

module.exports = app => {
  app.get('/api/scrape', ScrapeController.scrape);
  app.get('/api/articles', ArticleController.display);
  app.post('/notes/:id', NoteController.add);
};