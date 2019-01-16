var express = require('express');
var router = express.Router();

var News = require('../models/news');

// show data
router.get('/news', (req, res, next) => {
  News.find( function(err, news) {
    res.json(news);
  });
});

// add data
router.post('/news', (req, res, next) => {
  var newNews = new News({
    galeriaId: req.body.galeriaId,
    titulo: req.body.titulo,
    subTitulo: req.body.subTitulo,
  });

  newNews.save((err, news) => {
    if (err) {
      res.json({msg: 'Failed do add news. ' + err});
    }
    else {
      res.json({msg: 'News added'});
    }
  });
});

// delete data
router.delete('/news/:galeriaId', (req, res, next) => {
  News.remove({_galeriaId: req.params.galeriaId}, function(err, res) {
    if (err) {
      res.json(err);
    } else {
      res.json(res);
    }
  })
});

module.exports = router;