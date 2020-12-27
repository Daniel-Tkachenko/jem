const express = require('express');
const router = express.Router();

const { getAllPortfolios, getPortfolioByUrl } = require('../services/portfolio');

router.get('/portfolios', (req, res) => {
  getAllPortfolios()
    .then(portfolios => res.send(portfolios))
    .catch(err => res.status(err.status).send(err.message));
})

router.get('/portfolio/:url', (req, res) => {
  getPortfolioByUrl(req.params.url)
    .then(portfolio => res.json(portfolio))
    .catch(err => res.status(err.status).send(err.message));
})

module.exports = router;