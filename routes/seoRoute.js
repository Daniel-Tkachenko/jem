const express = require('express');
const router = express.Router();
const SeoModel = require('../models/seo.model');

router.get('/seo', (req, res) => {
  SeoModel.find({}, (err, meta) => {
    if (err)
      return res.status(500).send(err);
    if (!meta) {
      return res.status(404).json({
        message: 'Ошибка: Страницы не найдены.'
      });
    }
    return res.status(200).send(meta);
  });
});

router.get('/seo/:_id', (req, res) => {
  SeoModel.findById(req.params._id, (err, seo) => {
    if (err)
      return res.status(500).send(err);
    if (!seo) {
      return res.status(404).json({
        message: 'Ошибка: Страница с таким идентификатором отсутствует.',
        id: req.params._id
      });
    }
    return res.status(200).send(seo);
  });
});

router.get('/seo-url/:url', (req, res) => {
  SeoModel.findOne({ "url": req.params.url }, (err, seo) => {
    if (err)
      return res.status(500).send(err);
    if (!seo) {
      return res.status(404).json({
        message: 'Ошибка: Страница с таким URL отсутствует.12',
        id: req.params.url
      });
    }
    return res.status(200).send(seo);
  });
});

// get news article by url
router.get('/seo-url/post/:url', (req, res) => {
  SeoModel.findOne({ "url": 'post/' + req.params.url }, (err, seo) => {
    if (err)
      return res.status(500).send(err);
    if (!seo) {
      return res.status(404).json({
        message: 'Ошибка: Статья с таким URL отсутствует.',
        id: req.params.url
      });
    }
    return res.status(200).send(seo);
  });
});
module.exports = router;