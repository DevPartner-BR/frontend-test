
module.exports = function (app) {

  var api = app.api.post;

  app.route('/v1/post')
    .get(api.lista)
    .post(api.salva)
    .put(api.atualiza)
    .delete(api.apaga)

  return app;
};
