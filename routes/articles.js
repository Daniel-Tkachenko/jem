const express = require('express');
const router = express.Router();

const { getAllArticles, getArticleByUrl } = require('../services/article');

router.get('/articles', (req, res) => {
  getAllArticles()
    .then(articles => res.send(articles))
    .catch(err => res.status(err.status).send(err.message));
})

router.get('/article/:url', (req, res) => {
  getArticleByUrl(req.params.url)
    .then(article => res.json(article))
    .catch(err => res.status(err.status).send(err.message));
})

module.exports = router;