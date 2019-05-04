const Article = require('../models/Article');
const Note = require('../models/Note');

module.exports = {
  add(req, res) {
    console.log(req.body);
    console.log(req.params.id);

    Note.create(req.body)
      .then(dbNote =>
        Article.findOneAndUpdate(
          { _id: req.params.id },
          { note: dbNote._id },
          { new: true }
        )
      )
      .catch(err => res.json(err));
  },
};