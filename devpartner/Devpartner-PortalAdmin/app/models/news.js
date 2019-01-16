var mongoose = require('mongoose');

var schema = mongoose.Schema({
  galeriaId: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  subTitulo: {
    type: String,
    required: true,
  },
  //conteudo: {
    //type: String,
    //required: true,
  //},
  //perfilgaleria: [],
  //imagemPrincipal: {
    //imagemPrincipalId: {
      //type: String,
      //required: true,
    //},
      //url: {
        //type: String,
        //required: true,
      //},
    //},
    //imagemThumbnail: {
      //imagemThumbnailId: {
        //type: String,
        //required: true,
      //},
      //url: {
        //type: String,
        //required: true,
      //},
    //z},
});

var News = module.exports = mongoose.model('News', schema);