var mongoose = require('mongoose');

module.exports = function () {

  var model = mongoose.model('Post');

  var api = {};

  api.lista = function (req, res) {
    model.find()
    .then(function (posts) {
      res.json(posts);
    }, function (error) {
      console.log("Erro na api de listar posts!");
      console.log(error);
      res.json(500);
    })
  };

  api.salva = function (req, res) {
    model.create(req.body)
    .then(function (post) {
      res.json(post);
    }, function (error) {
      console.log("Erro na api de salvar posts!");
      console.log(error);
      res.json(500);
    })
  };

  api.atualiza = function (req, res) {
    model.findOneAndUpdate({ id: req.params.id }, req.body, function (error, post) {
      if (post) {
        res.send(post);
      } else if (error) {
        console.log("Erro na api de atualizar posts!");
        console.log(error);
        res.json(500);
      }
    })
  };

  api.apaga = function (req, res) {
    model.findOneAndRemove({ id: req.params.id }, req.body, function (error, post) {
      if (post) {
        res.send(post);
      } else if (error) {
        console.log("Erro na pai de remover posts!");
        console.log(erro);
        res.json(500);
      }
    })
  };

  return api;
};
