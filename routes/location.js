const express = require('express');
const router = express.Router();

const { getAllLocations, getLocationByUrl } = require('../services/location');

router.get('/locations', (req, res) => {
  getAllLocations()
    .then(locations => res.send(locations))
    .catch(err => res.status(err.status).send(err.message));
})

router.get('/location/:url', (req, res) => {
  getLocationByUrl(req.params.url)
    .then(location => res.json(location))
    .catch(err => res.status(err.status).send(err.message));
})

module.exports = router;