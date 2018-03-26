var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  galeriaId: {
    type: Number,
    required: true
  },
  youtubeId: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  subTitulo: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  imagemThumbnailUrl: {
    type: String,
    required: true
  }
});

mongoose.model('Post', schema);

