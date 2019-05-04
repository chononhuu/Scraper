const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../models/Article');

module.exports = {
  scrape(req, res) {
    axios.get('https://www.smartbrief.com/industry/tech').then(res => {
      const $ = cheerio.load(res.data);

      $('div[class=multi-summary-wrapper]').each((i, element) => {
        const results = [];
        const title = $(element)
          .children('.multi-summary-title')
          .text()
          .trim();
        const summary = $(element)
          .children('.multi-summary-body')
          .text()
          .trim();
        const link = $(element)
          .children('.multi-summary-source')
          .children('a')
          .attr('href');

        results.push({
          title,
          summary,
          link,
        });
        Article.findOne({ title }).then(data => {
          if (!data) {
            Article.create(results)
              .then(dbArticle => console.log(dbArticle))
              .catch(err => console.log(err));
          }
        });
      });
    });
  },
};